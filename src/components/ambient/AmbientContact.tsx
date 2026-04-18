import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { AmbientCameraRig } from './AmbientCameraRig'

function GradientPlane() {
  const mesh = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  )

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec3 a = vec3(0.08, 0.06, 0.04);
      vec3 b = vec3(0.35, 0.28, 0.16);
      float t = 0.5 + 0.5 * sin(vUv.x * 3.0 + uTime * 0.4);
      vec3 col = mix(a, b, t * vUv.y);
      gl_FragColor = vec4(col, 0.22);
    }
  `

  useFrame((_, dt) => {
    uniforms.uTime.value += dt
    if (mesh.current) mesh.current.rotation.z += dt * 0.06
  })

  return (
    <mesh ref={mesh} scale={[4, 4, 1]} rotation={[0.2, 0, 0]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export function AmbientContact() {
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
        <GradientPlane />
      </Canvas>
    </div>
  )
}
