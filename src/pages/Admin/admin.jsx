import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const emptyProduct = {
    name: "",
    price: "",
    image: "",
    size: "",
    material: "",
    room:"Ванная",
    type:"bathroom",
    description: "",
    featured: false,
  };

  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

 const navigate = useNavigate();

useEffect(() => {
  if (localStorage.getItem("admin") !== "true") {
    navigate("/login");

    return;
  }

  loadProducts();
}, []);

  const loadProducts = async () => {
    try {
      const res = await fetch("https://my-backend-j4fz.onrender.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async () => {
    try {
const formData = new FormData();

formData.append("name", product.name);
formData.append("price", product.price);
formData.append("image", product.image);
formData.append("size", product.size);
formData.append("material", product.material);
formData.append("room", product.room);
formData.append("type", product.type);
formData.append("description", product.description);
formData.append("featured", product.featured);

      if (editingId) {
        await fetch(`https://my-backend-j4fz.onrender.com/products/${editingId}`, {
          method: "PUT",
          body: formData,
      });

        alert("Товар обновлен");
      } else {
        await fetch("https://my-backend-j4fz.onrender.com/products", {
          method: "POST",
          body: formData,
        });

        alert("Товар добавлен");
      }

      setProduct(emptyProduct);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Ошибка");
    }
  };

  const editProduct = (item) => {
    setEditingId(item._id);

    setProduct({
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
      material: item.material,
      room: item.room,
      type: item.type,
      description: item.description,
      featured: item.featured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Удалить товар?")) return;

    await fetch(`https://my-backend-j4fz.onrender.com/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "50px",
      }}
    >

      <button
  onClick={() => {
    localStorage.removeItem("admin");
    navigate("/login");
  }}
  style={{
    background: "#d9534f",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    float: "right",
  }}
>
  Выйти
</button>


      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#d4b483",
        }}
      >
        Админ-панель TileStore
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <input
          name="name"
          placeholder="Название"
          value={product.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Цена"
          value={product.price}
          onChange={handleChange}
        />

       <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setProduct({
      ...product,
      image: e.target.files[0],
    })
  }
/>
        <input
          name="size"
          placeholder="Размер"
          value={product.size}
          onChange={handleChange}
        />

        <input
          name="material"
          placeholder="Материал"
          value={product.material}
          onChange={handleChange}
        />

        <select
  name="room"
  value={product.room}
  onChange={handleChange}
>
  <option value="Ванная">🛁 Ванная</option>
  <option value="Кухня">🍳 Кухня</option>
  <option value="Гостиная">🛋 Гостиная</option>
  <option value="Терраса">🌿 Терраса</option>
</select>

<select
  name="type"
  value={product.type}
  onChange={handleChange}
>
  <option value="bathroom">🛁 Плитка для ванной</option>
  <option value="kitchen">🍳 Плитка для кухни</option>
  <option value="living">🛋 Плитка для гостиной</option>
  <option value="porcelain">🏢 Керамогранит</option>
  <option value="outdoor">🌿 Уличная плитка</option>
</select>

<label
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontSize: "18px",
  }}
>
  <input
    type="checkbox"
    checked={product.featured}
    onChange={(e) =>
      setProduct({
        ...product,
        featured: e.target.checked,
      })
    }
  />

  Показывать на главной странице
</label>

        <textarea
          rows="5"
          name="description"
          placeholder="Описание"
          value={product.description}
          onChange={handleChange}
        />

        <button
          onClick={saveProduct}
          style={{
            background: "#d4b483",
            color: "black",
            border: "none",
            padding: "16px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {editingId ? "Сохранить изменения" : "Добавить товар"}
        </button>
      </div>

      <h2
        style={{
          marginTop: "70px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Все товары
      </h2>

      < div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
{products.map((item) => (
  <div
    key={item._id}
    style={{
      background: "#1b1b1b",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,.4)",
    }}
  >
    <img
      src={item.image}
      alt={item.name}
      style={{
        width: "100%",
        height: "220px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />

    <h2
      style={{
        marginTop: "20px",
        color: "white",
      }}
    >
      {item.name}
    </h2>

    <p style={{ color: "#aaa" }}>
      {item.description}
    </p>

    <p>
      <b>Размер:</b> {item.size}
    </p>

    <p>
      <b>Материал:</b> {item.material}
    </p>

    <h2
      style={{
        color: "#d4b483",
      }}
    >
      {item.price} ₸
    </h2>

    <div
      style={{
        display: "flex",
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <button
        onClick={() => editProduct(item)}
        style={{
          flex: 1,
          background: "#d4b483",
          color: "black",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        ✏️ Редактировать
      </button>

      <button
        onClick={() => deleteProduct(item._id)}
        style={{
          flex: 1,
          background: "#d9534f",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        🗑️ Удалить
      </button>
    </div>
  </div>
))}

      </div>
      </div>
  );
}

export default Admin;
