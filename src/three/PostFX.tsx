import { EffectComposer, Vignette, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function PostFX() {
  return (
    <EffectComposer>
      <Vignette offset={0.38} darkness={0.62} blendFunction={BlendFunction.NORMAL} />
      <Bloom
        intensity={0.25}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.025}
        blendFunction={BlendFunction.ADD}
      />
    </EffectComposer>
  )
}
