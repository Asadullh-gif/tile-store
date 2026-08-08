import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export default function WallLeft({ color, tile }) {
  const texture = tile
    ? useLoader(THREE.TextureLoader, tile.image)
    : null;

  if (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
  }

  console.log("LEFT:", tile);

  return (
    <mesh
      position={[-4, 2, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <planeGeometry args={[8, 4]} />

      <meshStandardMaterial
        color={color}
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}