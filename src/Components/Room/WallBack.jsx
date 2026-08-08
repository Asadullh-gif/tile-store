import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export default function WallBack({ color, tile }) {
  const texture = tile
    ? useLoader(THREE.TextureLoader, tile.image)
    : null;

  if (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
  }
console.log("WallBack tile:", tile);
console.log("Image:", tile?.image);
  return (
    <mesh position={[0, 2, -4]}>
      <planeGeometry args={[8, 4]} />

      <meshStandardMaterial
        color={color}
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}