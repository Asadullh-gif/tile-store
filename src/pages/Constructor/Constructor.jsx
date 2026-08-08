import { Link } from "react-router-dom";
import { useState } from "react";
import Scene from "../../Components/Scene";
import useProducts from "../../store/useProducts";

export default function Constructor() {
  const [wallColor, setWallColor] = useState("#ffffff");
  const [floorColor, setFloorColor] = useState("#d8d8d8");
  const { products } = useProducts();

  const [applyBack, setApplyBack] = useState(true);
const [applyLeft, setApplyLeft] = useState(true);
const [applyRight, setApplyRight] = useState(true);
const [applyFloor, setApplyFloor] = useState(false);


const [backTile, setBackTile] = useState(null);
const [leftTile, setLeftTile] = useState(null);
const [rightTile, setRightTile] = useState(null);
const [floorTile, setFloorTile] = useState(null);


const buttonStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "10px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  background: "#d4b483",
  color: "#111",
  fontWeight: "600",
};

const button2 = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  background: "#2b2b2b",
  color: "white",
};

const activeButton = {
  ...button2,
  background: "#d4b483",
  color: "#111",
};

const dividerStyle = {
  height: "1px",
  background: "linear-gradient(to right, transparent, #d4b483, transparent)",
  border: "none",
  margin: "22px 0",
};

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111",
        overflow: "hidden",
      }}
    >
      {/* Левая панель */}
      <div
  style={{
    width: "320px",
    background: "#1a1a1a",
    color: "white",
    padding: "30px",
    borderRight: "1px solid #2a2a2a",

    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
  }}
>
        <Link
          to="/"
          style={{
            color: "#d4b483",
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          ← На главную
        </Link>

        <h1 style={{
           marginTop: "40px",
           color: "#d4b483",
            fontSize: "28px",
            fontWeight: "600",

          }}>
          3D Конструктор
        </h1>


        <h3>Цвет стен</h3>

        <hr style={dividerStyle} />

        <button
          style={buttonStyle}
          onClick={() => setWallColor("#ffffff")}
        >
          ⚪ Белый
        </button>

        <button
          style={buttonStyle}
          onClick={() => setWallColor("#d8c7a0")}
        >
          🟤 Бежевый
        </button>

        <button
          style={buttonStyle}
          onClick={() => setWallColor("#7a7a7a")}
        >
          ⚫ Серый
        </button>

       

        

<h3 style={{ marginTop: 20 }}>
Куда применить
</h3>

<hr style={dividerStyle} />

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  }}
>
  <label>
    <input
      type="checkbox"
      checked={applyBack}
      onChange={(e) => setApplyBack(e.target.checked)}
    />
    {" "}Задняя стена
  </label>

  <label>
    <input
      type="checkbox"
      checked={applyLeft}
      onChange={(e) => setApplyLeft(e.target.checked)}
    />
    {" "}Левая стена
  </label>

  <label>
    <input
      type="checkbox"
      checked={applyRight}
      onChange={(e) => setApplyRight(e.target.checked)}
    />
    {" "}Правая стена
  </label>

  <label>
    <input
      type="checkbox"
      checked={applyFloor}
      onChange={(e) => setApplyFloor(e.target.checked)}
    />
    {" "}Пол
  </label>
</div>

<hr style={dividerStyle} />

<h3
  style={{
    marginTop: 45,
    marginBottom: 20,
  }}
>
Плитка
</h3>


  
<div
  style={{
    display: "flex",
    flexDirection: "column",

    gap: 12,

    height: 420,

    overflowY: "auto",

    paddingRight: 6,

    borderRadius: 12,
  }}
>

  {products.map((product) => (
    <div
      key={product._id}
      onClick={() => {

if (applyBack) {
    setBackTile(product);
}

if (applyLeft) {
    setLeftTile(product);
}

if (applyRight) {
    setRightTile(product);
}

if (applyFloor) {
    setFloorTile(product);
}

}}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        background:
(
  (applyBack && backTile?._id === product._id) ||
  (applyLeft && leftTile?._id === product._id) ||
  (applyRight && rightTile?._id === product._id) ||
  (applyFloor && floorTile?._id === product._id)
)
? "#d4b483"
: "#252525",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      <img
        src={product.image}
        alt=""
        style={{
          width: 60,
          height: 60,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div>
        <div
          style={{
            color:
(
  backTile?._id === product._id ||
  leftTile?._id === product._id ||
  rightTile?._id === product._id ||
  floorTile?._id === product._id
)
  ? "#111"
  : "white",
            fontWeight: 600,
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            color:
(
  backTile?._id === product._id ||
  leftTile?._id === product._id ||
  rightTile?._id === product._id ||
  floorTile?._id === product._id
)
  ? "#111"
  : "#bbb",
            fontSize: 13,
          }}
        >
          {product.price} ₸
        </div>
      </div>
    </div>
  ))}
</div>

        <div
          style={{
            marginTop: 40,
            padding: 20,
            borderRadius: 12,
            background: "#222",
            color: "#ccc",
            lineHeight: 1.6,
          }}
        >
          🖱 ЛКМ — вращение<br />
          🔍 Колесо — масштаб<br />
          ✋ ПКМ — перемещение
        </div>
      </div>

      {/* 3D */}
      <div style={{ flex: 1 }}>
        <Scene
  wallColor={wallColor}
  floorColor={floorColor}

  backTile={backTile}
  leftTile={leftTile}
  rightTile={rightTile}
  floorTile={floorTile}
/>
      </div>
    </div>
  );
}

