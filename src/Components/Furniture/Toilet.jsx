export default function Toilet() {
  return (
    <mesh position={[-4, 0.5, 2]}>
      <boxGeometry args={[0.6, 1, 0.8]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}