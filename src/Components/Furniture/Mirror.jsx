export default function Mirror() {
  return (
    <mesh position={[-3.2, 2, -4.9]}>
      <planeGeometry args={[1.2, 0.9]} />
      <meshStandardMaterial
        color="#ddeeff"
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}