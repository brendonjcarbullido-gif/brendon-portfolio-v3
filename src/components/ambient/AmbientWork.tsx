import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { AmbientCameraRig } from './AmbientCameraRig'

function FloatingPlanes() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.z += dt * 0.04
    const t = performance.now() * 0.0003
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t + i * 0.7) * 0.12
    })
  })

  const planes = [
    [-1.8, 0.6, 0],
    [1.2, -0.4, -0.5],
    [0.2, 1.1, -1],
    [-0.5, -1.2, -0.8],
    [2.0, 0.2, -1.2],
  ] as const

  return (
    <group ref={group}>
      {planes.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0.3, 0.5 + i * 0.2, 0.2]}>
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial color="#c9a96e" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

export function AmbientWork() {
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
        <FloatingPlanes />
      </Canvas>
    </div>
  )
}
