import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HeroVideo() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const textureRef = useRef<THREE.VideoTexture | null>(null)
  const currentPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/videos/C0006.mp4'
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('muted', '')
    video.setAttribute('autoplay', '')
    video.setAttribute('webkit-playsinline', '')
    video.crossOrigin = 'anonymous'

    video.style.cssText =
      'position:fixed;top:-9999px;opacity:0;pointer-events:none;width:1px;height:1px;'
    document.body.appendChild(video)

    video.load()

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const tryPlay = () => {
          void video.play()
          document.removeEventListener('touchstart', tryPlay)
          window.removeEventListener('click', tryPlay)
        }
        document.addEventListener('touchstart', tryPlay, { once: true, passive: true })
        window.addEventListener('click', tryPlay, { once: true })
      })
    }

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.colorSpace = THREE.SRGBColorSpace
    textureRef.current = texture

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.map = texture
      mat.needsUpdate = true
    }

    return () => {
      video.remove()
      texture.dispose()
    }
  }, [])

  useFrame(({ mouse }) => {
    if (textureRef.current) textureRef.current.needsUpdate = true

    if (groupRef.current) {
      const targetX = -mouse.x * 0.12
      const targetY = -mouse.y * 0.08

      currentPos.current.x += (targetX - currentPos.current.x) * 0.04
      currentPos.current.y += (targetY - currentPos.current.y) * 0.04

      groupRef.current.position.x = currentPos.current.x
      groupRef.current.position.y = currentPos.current.y
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[28, 18]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[28, 18]} />
        <meshBasicMaterial color="#0D0B09" transparent opacity={0.58} depthWrite={false} />
      </mesh>
    </group>
  )
}
