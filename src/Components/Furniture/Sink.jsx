export default function Sink() {
  return (
    <mesh position={[-3.2, 0.5, -3.8]}>
      <boxGeometry args={[0.8, 1, 0.5]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}