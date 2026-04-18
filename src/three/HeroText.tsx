import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export function HeroText() {
  const { viewport } = useThree()

  const scale = Math.min(1, viewport.width / 11)

  const brendonSize = 0.88 * scale
  const carbullidoSize = 0.72 * scale

  const brendonY = 0.52 * scale
  const carbullidoY = -0.22 * scale

  return (
    <group>
      <Text
        position={[0, brendonY, 2.0]}
        fontSize={brendonSize}
        color="#F5F0E8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        lineHeight={1}
        material-toneMapped={false}
      >
        BRENDON
      </Text>
      <Text
        position={[0, carbullidoY, 1.8]}
        fontSize={carbullidoSize}
        color="#F5F0E8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.01}
        lineHeight={1}
        material-toneMapped={false}
      >
        CARBULLIDO
      </Text>
    </group>
  )
}
