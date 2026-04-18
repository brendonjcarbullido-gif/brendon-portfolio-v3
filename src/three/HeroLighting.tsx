export function HeroLighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#FFF8F0" />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#FFF4E8" />
      <directionalLight position={[-4, 0, 2]} intensity={0.3} color="#E8F0FF" />
      <pointLight position={[0, 0, -1]} intensity={0.8} color="#C4A882" distance={8} decay={2} />
    </>
  )
}
