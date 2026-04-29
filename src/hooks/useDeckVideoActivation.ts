import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useDeckVideoActivation(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string | undefined,
): void {
  useEffect(() => {
    const el = videoRef.current
    if (!el || !src) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.intersectionRatio > 0.5) {
          if (!el.getAttribute('src')) {
            el.src = src
            el.load()
          }
          el.play().catch(() => {})
        } else if (entry.intersectionRatio < 0.1) {
          el.pause()
          el.removeAttribute('src')
          el.load()
        }
      },
      { threshold: [0, 0.1, 0.5, 0.9] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [videoRef, src])
}
