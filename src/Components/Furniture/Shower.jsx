export default function Shower() {
  return (
    <mesh position={[3, 1.2, -3]}>
      <boxGeometry args={[1.8, 2.4, 0.03]} />
      <meshStandardMaterial
        color="#dff4ff"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}