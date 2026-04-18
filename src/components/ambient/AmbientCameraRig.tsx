import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

/** Subtle parallax — matches hero FOV, tight range, slow lerp. */
export function AmbientCameraRig() {
  const { camera, mouse } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 5))

  useFrame(() => {
    target.current.x = mouse.x * 0.15
    target.current.y = mouse.y * 0.15
    target.current.z = 5
    camera.position.lerp(target.current, 0.02)
    camera.lookAt(0, 0, 0)
  })

  return null
}
