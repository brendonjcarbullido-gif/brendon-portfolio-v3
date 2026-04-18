import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { setGyroActive } from '@/three/gyroState'

const DeviceOrientationEventMaybe =
  typeof window !== 'undefined' &&
  typeof (window as any).DeviceOrientationEvent !== 'undefined'
    ? ((window as any).DeviceOrientationEvent as {
        requestPermission?: () => Promise<'granted' | 'denied'>
      })
    : null

export function GyroPermission() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    if (!isMobile) return
    setVisible(true)

    if (typeof DeviceOrientationEventMaybe?.requestPermission !== 'function') {
      setPermissionGranted(true)
    }
  }, [])

  const handleToggle = async () => {
    if (active) {
      setActive(false)
      setGyroActive(false)
      window.dispatchEvent(new Event('gyro-stop'))
      return
    }

    if (!permissionGranted) {
      const req = DeviceOrientationEventMaybe?.requestPermission
      if (typeof req === 'function') {
        try {
          const result = await req()
          if (result !== 'granted') return
        } catch {
          return
        }
      }
      setPermissionGranted(true)
    }

    setActive(true)
    setGyroActive(true)
    window.dispatchEvent(new Event('gyro-start'))
  }

  if (!visible) return null

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      onClick={handleToggle}
      type="button"
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        left: 'auto',
        bottom: 'auto',
        transform: 'none',
        zIndex: 200,
        background: active ? 'rgba(196,168,130,0.15)' : 'rgba(245,240,232,0.06)',
        border: active ? '1px solid rgba(196,168,130,0.5)' : '1px solid rgba(245,240,232,0.2)',
        color: active ? '#C4A882' : 'rgba(245,240,232,0.6)',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.62rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '12px 24px',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease',
      }}
    >
      {active ? 'Stop 3D Experience' : 'Enable 3D Experience'}
    </motion.button>
  )
}
