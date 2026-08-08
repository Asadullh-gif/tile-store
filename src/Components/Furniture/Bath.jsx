import { useGLTF } from "@react-three/drei";

export default function Bath() {
  const { scene } = useGLTF("/models/bath.glb");

  return (
    <primitive
      object={scene}
      position={[2, 0, 2]}
      scale={1}
      rotation={[0, Math.PI, 0]}
    />
  );
}

useGLTF.preload("/models/bath.glb");