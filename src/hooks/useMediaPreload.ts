import { useEffect, useRef, useState } from 'react'

export type MediaAsset = { src: string; type: 'image' | 'video' }

function isMobileDevice(): boolean {
  return (
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

/** Imperative version — use in event handlers or effects where a hook isn't appropriate. */
export function preloadAssets(assets: MediaAsset[]): Promise<void> {
  if (assets.length === 0) return Promise.resolve()
  const mobile = isMobileDevice()
  return Promise.allSettled(
    assets.map(
      ({ src, type }) =>
        new Promise<void>((resolve) => {
          if (type === 'image') {
            const img = new Image()
            let done = false
            const finish = () => { if (!done) { done = true; resolve() } }
            img.onload = finish
            img.onerror = finish
            img.src = src
            if (img.complete) finish()
          } else {
            // iOS/Android block video preload without user interaction — resolve immediately.
            // Poster images handle the visual gap on mobile.
            if (mobile) { resolve(); return }
            const video = document.createElement('video')
            video.preload = 'auto'
            video.muted = true
            video.playsInline = true
            let done = false
            const finish = () => {
              if (!done) {
                done = true
                video.removeEventListener('loadeddata', finish)
                video.removeEventListener('error', finish)
                resolve()
              }
            }
            video.addEventListener('loadeddata', finish, { once: true })
            video.addEventListener('error', finish, { once: true })
            video.src = src
            video.load()
            if (video.readyState >= 2) finish()
          }
        }),
    ),
  ).then(() => {})
}

export function useMediaPreload(assets: MediaAsset[]) {
  const [loaded, setLoaded] = useState(0)
  const total = assets.length

  const assetsRef = useRef(assets)

  useEffect(() => {
    const list = assetsRef.current
    if (list.length === 0) return
    let mounted = true
    let count = 0
    const mobile = isMobileDevice()

    const advance = () => {
      if (!mounted) return
      count++
      setLoaded(count)
    }

    list.forEach(({ src, type }) => {
      if (type === 'image') {
        const img = new Image()
        let resolved = false
        const resolve = () => {
          if (resolved) return
          resolved = true
          advance()
        }
        img.onload = resolve
        img.onerror = resolve
        img.src = src
        if (img.complete) resolve()
      } else {
        // iOS/Android cannot preload video without user interaction — skip and count done.
        if (mobile) { advance(); return }
        const video = document.createElement('video')
        video.preload = 'auto'
        video.muted = true
        video.playsInline = true
        let resolved = false
        const resolve = () => {
          if (resolved) return
          resolved = true
          video.removeEventListener('loadeddata', resolve)
          video.removeEventListener('error', resolve)
          advance()
        }
        video.addEventListener('loadeddata', resolve, { once: true })
        video.addEventListener('error', resolve, { once: true })
        video.src = src
        video.load()
        if (video.readyState >= 2) resolve()
      }
    })

    return () => {
      mounted = false
    }
  }, []) // intentionally run once — assets list is stable

  return {
    loaded,
    total,
    progress: total === 0 ? 1 : loaded / total,
    done: total === 0 || loaded >= total,
  }
}
