import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { heroLookInput } from './heroLookInput'
import { faceInput } from './faceInput'

let gyroRunning = false

if (typeof window !== 'undefined') {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  if (!isMobile) {
    window.addEventListener(
      'mousemove',
      (e) => {
        heroLookInput.x = (e.clientX / window.innerWidth) * 2 - 1
        heroLookInput.y = -((e.clientY / window.innerHeight) * 2 - 1)
      },
      { passive: true },
    )
  }
}

function startGyro() {
  if (gyroRunning) return
  gyroRunning = true
  window.addEventListener('deviceorientation', handleOrientation, { passive: true })
}

function stopGyro() {
  gyroRunning = false
  window.removeEventListener('deviceorientation', handleOrientation)
  heroLookInput.x = 0
  heroLookInput.y = 0
}

function handleOrientation(e: DeviceOrientationEvent) {
  if (!gyroRunning) return
  heroLookInput.x = Math.max(-1, Math.min(1, -(e.gamma ?? 0) / 30))
  heroLookInput.y = Math.max(-1, Math.min(1, ((e.beta ?? 0) - 15) / 30))
}

if (typeof window !== 'undefined') {
  window.addEventListener('gyro-start', startGyro)
  window.addEventListener('gyro-stop', stopGyro)
}

const BASE_Z = 5
const RANGE_X = 0.45
const RANGE_Y = 0.28
const LERP_SPEED = 0.05

export function HeroCamera() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, BASE_Z))

  useFrame(() => {
    const srcX = faceInput.active ? faceInput.x : heroLookInput.x
    const srcY = faceInput.active ? faceInput.y : heroLookInput.y
    const z = BASE_Z + (faceInput.active ? faceInput.z : 0)
    target.current.set(srcX * RANGE_X, srcY * RANGE_Y, z)
    camera.position.lerp(target.current, LERP_SPEED)
    camera.lookAt(0, 0, 0)
  })

  return null
}
