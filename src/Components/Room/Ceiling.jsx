export default function Ceiling() {
  return (
    <mesh
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 4, 0]}
    >
      <planeGeometry args={[8,8]} />

      <meshStandardMaterial
        color="#ffffff"
        side={2}
      />
    </mesh>
  );
}