import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { AmbientCameraRig } from './AmbientCameraRig'

function RuleLines() {
  const group = useRef<THREE.Group>(null)
  const xs = [-2.2, -1.1, 0, 1.1, 2.2]

  useFrame(() => {
    if (!group.current) return
    group.current.position.x = Math.sin(performance.now() * 0.00015) * 0.08
    group.current.children.forEach((line, i) => {
      line.position.z = Math.sin(performance.now() * 0.0002 + i) * 0.05
    })
  })

  return (
    <group ref={group}>
      {xs.map((x, i) => (
        <mesh key={i} position={[x, 0, -0.5 - i * 0.02]} scale={[0.02, 5, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#c9a96e" transparent opacity={0.08} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

export function AmbientResume() {
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
        <RuleLines />
      </Canvas>
    </div>
  )
}
