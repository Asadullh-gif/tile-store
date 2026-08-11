import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function Catalog({cart, setCart}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [room, setRoom] = useState("Все");
  const [search, setSearch] = useState("");
const [sort, setSort] = useState("popular");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");

const addToCart = (product) => {
  setCart((prevCart) => [...prevCart, product]);
  alert("Товар добавлен в корзину");
};

  useEffect(() => {


    fetch("https://my-backend-j4fz.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


  let filtered = [...products];




// Поиск
filtered = filtered.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);

// Помещение
if (room !== "Все") {
  filtered = filtered.filter((item) => item.room === room);
}

// Минимальная цена
if (minPrice !== "") {
  filtered = filtered.filter(
    (item) => Number(item.price) >= Number(minPrice)
  );
}

// Максимальная цена
if (maxPrice !== "") {
  filtered = filtered.filter(
    (item) => Number(item.price) <= Number(maxPrice)
  );
}

// Сортировка
if (sort === "cheap") {
  filtered.sort((a, b) => a.price - b.price);
}

if (sort === "expensive") {
  filtered.sort((a, b) => b.price - a.price);
}

if (sort === "name") {
  filtered.sort((a, b) => a.name.localeCompare(b.name));
}

      

  return (

    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <Link
  to="/"
  style={{
    position: "fixed",
    top: "30px",
    left: "30px",
    background: "#d4b483",
    color: "#111",
    padding: "14px 22px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "700",
    boxShadow: "0 10px 30px rgba(0,0,0,.3)",
    zIndex: 9999,
  }}
>
  ← Главная
</Link>


      <h1
  style={{
    fontSize: "55px",
    textAlign: "center",
    marginBottom: "10px",
    color: "#fff",
  }}
>
  Каталог плитки
</h1>

<p
  style={{
    textAlign: "center",
    color: "#999",
    fontSize: "18px",
    marginBottom: "50px",
  }}
>
  Найдено товаров: {filtered.length}
</p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "30px 0",
          flexWrap: "wrap",
        }}
      >
        {[
  { icon: "⭐", name: "Все" },
  { icon: "🛁", name: "Ванная" },
  { icon: "🍳", name: "Кухня" },
  { icon: "🛋", name: "Гостиная" },
  { icon: "🌿", name: "Терраса" },
  { icon: "🛏", name: "Спальня" },
].map((r) => (
         
  <button
  key={r.name}
  onClick={() => setRoom(r.name)}
  style={{
    padding: "18px 28px",
    border: "none",
    borderRadius: "18px",
    cursor: "pointer",
    background:
      room === r.name
        ? "#d4b483"
        : "rgba(255,255,255,.08)",
    color:
      room === r.name
        ? "#111"
        : "white",
    fontSize: "18px",
    fontWeight: "600",
    transition: ".3s",
    backdropFilter: "blur(12px)",
  }}
>
  <span style={{ fontSize: "24px" }}>
    {r.icon}
  </span>

  <br />

  {r.name}
</button>
        ))}
      </div>


      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    gap: "20px",
    flexWrap: "wrap",
  }}
>

  <input
    type="text"
    placeholder="🔍 Поиск плитки..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: 1,
      minWidth: "280px",
      padding: "18px",
      borderRadius: "15px",
      border: "none",
      background: "#1b1b1b",
      color: "white",
      fontSize: "17px",
    }}
  />

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    style={{
      padding: "18px",
      borderRadius: "15px",
      border: "none",
      background: "#1b1b1b",
      color: "white",
      fontSize: "17px",
    }}
  >
    <option value="popular">Популярные</option>
    <option value="cheap">Цена ↑</option>
    <option value="expensive">Цена ↓</option>
    <option value="name">По названию</option>
  </select>

</div>

<div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "50px",
    flexWrap: "wrap",
  }}
>

<input
  type="number"
  placeholder="Цена от"
  value={minPrice}
  onChange={(e)=>setMinPrice(e.target.value)}
  style={{
    width:"180px",
    padding:"16px",
    borderRadius:"12px",
    border:"none",
    background:"#1b1b1b",
    color:"white",
  }}
/>

<input
  type="number"
  placeholder="Цена до"
  value={maxPrice}
  onChange={(e)=>setMaxPrice(e.target.value)}
  style={{
    width:"180px",
    padding:"16px",
    borderRadius:"12px",
    border:"none",
    background:"#1b1b1b",
    color:"white",
  }}
/>

</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
        }}
      >
        {filtered.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#1b1b1b",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
  src={item.image}
  alt={item.name}
  onClick={() => setSelectedImage(item.image)}
  style={{
    width: "100%",
    height: "250px",
    objectFit: "cover",
    cursor: "zoom-in",
    borderRadius: "15px",
  }}
/>

            <div style={{ padding: "20px" }}>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "22px",
                  marginBottom: "10px",
                }}
              >
                {item.name}
                </h2>
                <p>
                  {item.size}
                </p>

              <p>{item.room}</p>

              <p>{item.material}</p>

              <h3 style={{ color: "#d4b483" }}>
                {item.price} ₸
              </h3>
<button
  onClick={() => addToCart(item)}
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    background: "#d4b483",
    color: "black",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  }}
>
  🛒 Добавить в корзину
</button>

            </div>
          </div>
        ))}
      </div>

     {selectedImage && (
  <div
    onClick={() => setSelectedImage(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
      cursor: "zoom-out",
      padding: "30px",
    }}
  >
    <img
      src={selectedImage}
      alt="Увеличенное изображение"
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "90%",
        maxHeight: "90%",
        objectFit: "contain",
        borderRadius: "15px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    />

    <button
      onClick={() => setSelectedImage(null)}
      style={{
        position: "absolute",
        top: "25px",
        right: "30px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "#d4b483",
        color: "#111",
        fontSize: "28px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      ×
    </button>
  </div>
)}

    </div>
  );
}

export default Catalog;