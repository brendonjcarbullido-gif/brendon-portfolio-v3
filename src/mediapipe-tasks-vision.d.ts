/** Minimal typings so tsc resolves `@mediapipe/tasks-vision` under `moduleResolution: bundler`. */
declare module '@mediapipe/tasks-vision' {
  export interface NormalizedLandmark {
    x: number
    y: number
    z: number
  }

  export interface FaceLandmarkerResult {
    faceLandmarks: NormalizedLandmark[][]
  }

  export type WasmFileset = object

  export interface FaceLandmarkerOptions {
    baseOptions?: {
      modelAssetPath?: string
      delegate?: 'CPU' | 'GPU'
    }
    runningMode?: 'IMAGE' | 'VIDEO'
    numFaces?: number
  }

  export class FaceLandmarker {
    static createFromOptions(
      wasmFileset: WasmFileset,
      faceLandmarkerOptions: FaceLandmarkerOptions,
    ): Promise<FaceLandmarker>

    detectForVideo(
      videoFrame: HTMLVideoElement,
      timestamp: number,
    ): FaceLandmarkerResult

    close(): void
  }

  export class FilesetResolver {
    static forVisionTasks(basePath?: string, useModule?: boolean): Promise<WasmFileset>
  }
}
