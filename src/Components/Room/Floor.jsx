import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function Floor({ color, tile }) {
  const texture = tile ? useTexture(tile.image) : null;

  if (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />

      <meshStandardMaterial
        color={texture ? "white" : color}
        map={texture}
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
}