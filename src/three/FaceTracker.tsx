import { useEffect } from 'react'
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'
import type { FaceLandmarkerOptions } from '@mediapipe/tasks-vision'
import { faceInput } from './faceInput'

const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'

/** Matches installed @mediapipe/tasks-vision for WASM resolution. */
const VISION_WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.33/wasm'

const SMOOTH = 0.85
const RAW_WEIGHT = 0.15

const LOST_FACE_FRAMES = 3

function isFaceTrackingEligible(): boolean {
  if (typeof window === 'undefined') return false
  if (window.innerWidth < 768) return false
  if (navigator.maxTouchPoints > 0) return false
  try {
    if (window.matchMedia('(pointer: coarse)').matches) return false
  } catch {
    /* ignore */
  }
  return true
}

export function FaceTracker() {
  useEffect(() => {
    if (!isFaceTrackingEligible()) return

    let rafId = 0
    let landmarker: FaceLandmarker | null = null
    let video: HTMLVideoElement | null = null
    let stream: MediaStream | null = null
    let running = true

    let smoothX = 0
    let smoothY = 0
    let smoothZ = 0
    let missedFrames = 0

    const tick = () => {
      if (!running) return
      rafId = requestAnimationFrame(tick)

      if (!landmarker || !video || video.readyState < 2) return

      try {
        const results = landmarker.detectForVideo(video, performance.now())
        const landmarks = results.faceLandmarks?.[0]
        if (!landmarks || landmarks.length < 478) {
          missedFrames++
          if (missedFrames >= LOST_FACE_FRAMES) faceInput.active = false
          return
        }

        const leftIris = landmarks[468]
        const rightIris = landmarks[473]

        let rawX: number
        let rawY: number

        if (
          leftIris &&
          rightIris &&
          !Number.isNaN(leftIris.x) &&
          !Number.isNaN(rightIris.x)
        ) {
          rawX = -((leftIris.x + rightIris.x) / 2 - 0.5) * 2
          rawY = -((leftIris.y + rightIris.y) / 2 - 0.5) * 2
        } else {
          const nose = landmarks[1]
          rawX = -(nose.x - 0.5) * 2
          rawY = -(nose.y - 0.5) * 2
        }

        rawX = Math.max(-1, Math.min(1, rawX))
        rawY = Math.max(-1, Math.min(1, rawY))

        const xs = landmarks.map((l) => l.x)
        const faceWidth = Math.max(...xs) - Math.min(...xs)
        let rawZ = ((faceWidth - 0.15) / (0.5 - 0.15)) * -0.15
        rawZ = Math.max(-0.15, Math.min(0, rawZ))

        smoothX = smoothX * SMOOTH + rawX * RAW_WEIGHT
        smoothY = smoothY * SMOOTH + rawY * RAW_WEIGHT
        smoothZ = smoothZ * SMOOTH + rawZ * RAW_WEIGHT

        faceInput.x = smoothX
        faceInput.y = smoothY
        faceInput.z = smoothZ
        faceInput.active = true
        missedFrames = 0
      } catch {
        faceInput.active = false
      }
    }

    const start = async () => {
      try {
        video = document.createElement('video')
        video.setAttribute('playsinline', '')
        video.setAttribute('muted', '')
        video.muted = true
        video.playsInline = true
        video.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;'
        document.body.appendChild(video)

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        })
        video.srcObject = stream
        await video.play()

        const vision = await FilesetResolver.forVisionTasks(VISION_WASM)
        landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1,
          minFaceDetectionConfidence: 0.5,
          minFacePresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
        } as unknown as FaceLandmarkerOptions)

        rafId = requestAnimationFrame(tick)
      } catch {
        faceInput.active = false
        faceInput.x = 0
        faceInput.y = 0
        faceInput.z = 0
        if (stream) {
          stream.getTracks().forEach((t) => t.stop())
          stream = null
        }
        if (video) {
          video.remove()
          video = null
        }
      }
    }

    void start()

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      faceInput.active = false
      faceInput.x = 0
      faceInput.y = 0
      faceInput.z = 0
      try {
        landmarker?.close()
      } catch {
        /* silent */
      }
      landmarker = null
      if (stream) {
        stream.getTracks().forEach((t) => t.stop())
        stream = null
      }
      if (video) {
        video.remove()
        video = null
      }
    }
  }, [])

  return null
}
