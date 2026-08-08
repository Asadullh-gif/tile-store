export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[6, 8, 6]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight
        position={[0, 3, 0]}
        intensity={0.8}
      />
    </>
  );
}