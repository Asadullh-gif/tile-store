import Floor from "./Floor";
import Ceiling from "./Ceiling";
import WallLeft from "./WallLeft";
import WallRight from "./WallRight";
import WallBack from "./WallBack";

export default function Room({
  wallColor,
  floorColor,

  backTile,
  leftTile,
  rightTile,
  floorTile,
}) {
  return (
    <>
      <Floor
        color={floorColor}
        tile={floorTile}
      />

      <Ceiling />

      <WallLeft
        color={wallColor}
        tile={leftTile}
      />

      <WallRight
        color={wallColor}
        tile={rightTile}
      />

      <WallBack
        color={wallColor}
        tile={backTile}
      />
    </>
  );
}