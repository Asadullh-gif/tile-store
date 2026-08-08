import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SceneLights from "./Lights/SceneLights";

import Room from "./Room/Room";

import Bath from "./Furniture/Bath";
import Sink from "./Furniture/Sink";
import Toilet from "./Furniture/Toilet";
import Shower from "./Furniture/Shower";
import Mirror from "./Furniture/Mirror";

export default function Scene(props) {
  return (
    <Canvas
      shadows
      camera={{
        position: [8, 5, 8],
        fov: 55,
      }}
      style={{
        background: "#202020",
      }}
    >
      <SceneLights />

      <Room
  wallColor={props.wallColor}
  floorColor={props.floorColor}

  backTile={props.backTile}
  leftTile={props.leftTile}
  rightTile={props.rightTile}
  floorTile={props.floorTile}
/>

      <Bath />
      <Sink />
      <Toilet />
      <Shower />
      <Mirror />

      <OrbitControls
        enableRotate
        enableZoom
        enablePan
        minDistance={4}
        maxDistance={20}
      />
    </Canvas>
  );
}