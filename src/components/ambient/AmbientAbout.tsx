import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { AmbientCameraRig } from './AmbientCameraRig'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4b87a"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.28}
      />
    </Points>
  )
}

export function AmbientAbout() {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
      aria-hidden
    >
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 25, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <AmbientCameraRig />
        <ParticleField />
      </Canvas>
    </div>
  )
}
