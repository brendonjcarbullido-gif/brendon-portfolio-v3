import { useCallback, useEffect, useRef, useState } from 'react'

type Permission = 'unknown' | 'pending' | 'granted' | 'denied' | 'unsupported'

export type OrientationState = {
  enabled: boolean
  permission: Permission
  beta: number   // -1 to 1, normalized front-back tilt
  gamma: number  // -1 to 1, normalized left-right tilt
}

export type OrientationActions = {
  requestPermission: () => Promise<void>
  enable: () => Promise<void>
  disable: () => void
  recenter: () => void
}

const BETA_MAX = 30
const GAMMA_MAX = 15
const SMOOTH = 0.85

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

// Module-level constants — evaluated once, SSR-safe
const supportsOrientation =
  typeof window !== 'undefined' && 'DeviceOrientationEvent' in window

// iOS inverts gamma relative to Android
const isIOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent)

type DOEWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

export function useDeviceOrientation(): [OrientationState, OrientationActions] {
  const [state, setState] = useState<OrientationState>({
    enabled: false,
    permission: supportsOrientation ? 'unknown' : 'unsupported',
    beta: 0,
    gamma: 0,
  })

  // Refs so callbacks stay stable and never go stale
  const enabledRef = useRef(false)
  const permissionRef = useRef<Permission>(supportsOrientation ? 'unknown' : 'unsupported')
  const smoothedBeta = useRef(0)
  const smoothedGamma = useRef(0)
  const rawBeta = useRef(0)
  const rawGamma = useRef(0)
  const betaOffset = useRef(0)
  const gammaOffset = useRef(0)
  const rafId = useRef<number | null>(null)

  const setPermission = useCallback((p: Permission) => {
    permissionRef.current = p
    setState(prev => ({ ...prev, permission: p }))
  }, [])

  const applyFrame = useCallback(() => {
    rafId.current = null
    smoothedBeta.current = smoothedBeta.current * SMOOTH + rawBeta.current * (1 - SMOOTH)
    smoothedGamma.current = smoothedGamma.current * SMOOTH + rawGamma.current * (1 - SMOOTH)
    setState(prev => ({
      ...prev,
      beta: clamp(smoothedBeta.current, -BETA_MAX, BETA_MAX) / BETA_MAX,
      gamma: clamp(smoothedGamma.current, -GAMMA_MAX, GAMMA_MAX) / GAMMA_MAX,
    }))
  }, [])

  const handleOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      rawBeta.current = (e.beta ?? 0) - betaOffset.current
      const g = e.gamma ?? 0
      rawGamma.current = (isIOS ? -g : g) - gammaOffset.current

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(applyFrame)
      }
    },
    [applyFrame],
  )

  const stopListening = useCallback(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('deviceorientation', handleOrientation)
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [handleOrientation])

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('deviceorientation', handleOrientation)
  }, [handleOrientation])

  const recenter = useCallback(() => {
    // Capture the current raw (pre-smoothing) values as the new zero baseline.
    // betaOffset/gammaOffset are subtracted in handleOrientation, so future
    // events will read as 0 relative to whatever angle the device is at now.
    betaOffset.current = rawBeta.current + betaOffset.current
    gammaOffset.current = rawGamma.current + gammaOffset.current
    // Snap the smoothed accumulator to 0 so the spring settles immediately
    // rather than drifting back from its last position.
    smoothedBeta.current = 0
    smoothedGamma.current = 0
    setState(prev => ({ ...prev, beta: 0, gamma: 0 }))
  }, [])

  const disable = useCallback(() => {
    enabledRef.current = false
    stopListening()
    smoothedBeta.current = 0
    smoothedGamma.current = 0
    rawBeta.current = 0
    rawGamma.current = 0
    betaOffset.current = 0
    gammaOffset.current = 0
    setState(prev => ({ ...prev, enabled: false, beta: 0, gamma: 0 }))
  }, [stopListening])

  const requestPermission = useCallback(async () => {
    if (!supportsOrientation) return
    const DOE = DeviceOrientationEvent as DOEWithPermission
    if (typeof DOE.requestPermission !== 'function') {
      setPermission('granted')
      return
    }
    setPermission('pending')
    try {
      const result = await DOE.requestPermission()
      setPermission(result)
    } catch {
      setPermission('denied')
    }
  }, [setPermission])

  const enable = useCallback(async () => {
    if (!supportsOrientation) return

    const p = permissionRef.current
    if (p === 'denied' || p === 'unsupported' || p === 'pending') return

    const DOE = DeviceOrientationEvent as DOEWithPermission

    if (p === 'unknown') {
      if (typeof DOE.requestPermission === 'function') {
        setPermission('pending')
        try {
          const result = await DOE.requestPermission()
          setPermission(result)
          if (result !== 'granted') return
        } catch {
          setPermission('denied')
          return
        }
      } else {
        // Non-iOS: auto-grant, no system dialog
        setPermission('granted')
      }
    }

    // permission is 'granted' — start
    enabledRef.current = true
    startListening()
    setState(prev => ({ ...prev, enabled: true }))

    // Capture next event as the new zero baseline
    const captureBaseline = () => {
      recenter()
      window.removeEventListener('deviceorientation', captureBaseline)
    }
    window.addEventListener('deviceorientation', captureBaseline, { once: true })
  }, [setPermission, startListening, recenter])

  // Pause/resume on tab hide — battery optimization
  useEffect(() => {
    if (typeof document === 'undefined') return
    const handleVisibility = () => {
      if (!enabledRef.current) return
      if (document.visibilityState === 'hidden') {
        stopListening()
      } else {
        startListening()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [stopListening, startListening])

  // Cleanup on unmount
  useEffect(() => {
    return () => stopListening()
  }, [stopListening])

  return [state, { requestPermission, enable, disable, recenter }]
}
