import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://my-backend-j4fz.onrender.com";

function Admin() {
  const navigate = useNavigate();

  const emptyProduct = {
    name: "",
    brand: "",
    collection: "",
    price: "",
    size: "",
    width: "",
    height: "",
    thickness: "",
    category: "wall",
    room: "Ванная",
    material: "",
    color: "",
    finish: "",
    description: "",
    featured: false,
    stock: "",
    active: true,
  };

  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  // Главное фото
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // 3 фото интерьера
  const [interiorImageFiles, setInteriorImageFiles] = useState([
    null,
    null,
    null,
  ]);

  // Старые фото интерьера
  const [existingInteriorImages, setExistingInteriorImages] = useState([
    null,
    null,
    null,
  ]);

  const [loading, setLoading] = useState(false);

  // =========================
  // ПРОВЕРКА АДМИНА
  // =========================

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/login");
      return;
    }

    loadProducts();
  }, [navigate]);

  // =========================
  // ЗАГРУЗКА ТОВАРОВ
  // =========================

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);

      if (!res.ok) {
        throw new Error("Не удалось загрузить товары");
      }

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error("Ошибка загрузки товаров:", err);
    }
  };

  // =========================
  // CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ГЛАВНОЕ ФОТО
  // =========================

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setImageFile(file);
  };

  // =========================
  // ФОТО ИНТЕРЬЕРА
  // =========================

  const handleInteriorImageChange = (index, file) => {
    setInteriorImageFiles((prev) => {
      const updated = [...prev];

      updated[index] = file || null;

      return updated;
    });
  };

  // =========================
  // УДАЛИТЬ НОВОЕ ФОТО
  // =========================

  const removeNewInteriorImage = (index) => {
    setInteriorImageFiles((prev) => {
      const updated = [...prev];

      updated[index] = null;

      return updated;
    });
  };

  // =========================
  // УДАЛИТЬ СТАРОЕ ФОТО
  // =========================

  const removeExistingInteriorImage = (index) => {
    setExistingInteriorImages((prev) => {
      const updated = [...prev];

      updated[index] = null;

      return updated;
    });
  };

  // =========================
  // СОХРАНИТЬ ТОВАР
  // =========================

  const saveProduct = async () => {
    if (!product.name.trim()) {
      alert("Введите название товара");
      return;
    }

    if (!product.price) {
      alert("Введите цену");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Основные данные
      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("collection", product.collection);
      formData.append("price", product.price);
      formData.append("size", product.size);

      formData.append("width", product.width);
      formData.append("height", product.height);
      formData.append("thickness", product.thickness);

      formData.append("category", product.category);
      formData.append("room", product.room);
      formData.append("material", product.material);
      formData.append("color", product.color);
      formData.append("finish", product.finish);

      formData.append("description", product.description);

      formData.append(
        "featured",
        product.featured ? "true" : "false"
      );

      formData.append("stock", product.stock);

      formData.append(
        "active",
        product.active ? "true" : "false"
      );

      // =========================
      // ГЛАВНОЕ ФОТО
      // =========================

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // =========================
      // ФОТО ИНТЕРЬЕРА
      // =========================

      interiorImageFiles.forEach((file, index) => {
        if (file) {
          formData.append(
            `interiorImage${index + 1}`,
            file
          );
        }
      });

      // =========================
      // СОХРАНЯЕМ СТАРЫЕ ФОТО
      // =========================
      //
      // Передаём индексы фотографий,
      // которые должны остаться.
      //
      // Например:
      // [старое1, null, старое3]
      //
      // отправим:
      // keepInterior0 = true
      // keepInterior1 = false
      // keepInterior2 = true
      //

      if (editingId) {
        existingInteriorImages.forEach(
          (image, index) => {
            formData.append(
              `keepInterior${index}`,
              image ? "true" : "false"
            );
          }
        );
      }

      // =========================
      // URL
      // =========================

      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Ошибка сохранения"
        );
      }

      console.log("Сохранён товар:", data);

      alert(
        editingId
          ? "Товар успешно обновлён"
          : "Товар успешно добавлен"
      );

      // =========================
      // СБРОС
      // =========================

      resetForm();

      await loadProducts();
    } catch (err) {
      console.error("Ошибка сохранения:", err);

      alert(
        `Ошибка: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // РЕДАКТИРОВАНИЕ
  // =========================

  const editProduct = (item) => {
    setEditingId(item._id);

    setImageFile(null);

    setExistingImage(item.image || "");

    setInteriorImageFiles([
      null,
      null,
      null,
    ]);

    const oldInteriorImages = [
      item.interiorImages?.[0] || null,
      item.interiorImages?.[1] || null,
      item.interiorImages?.[2] || null,
    ];

    setExistingInteriorImages(
      oldInteriorImages
    );

    setProduct({
      name: item.name || "",
      brand: item.brand || "",
      collection: item.collection || "",
      price: item.price || "",
      size: item.size || "",

      width: item.width || "",
      height: item.height || "",
      thickness: item.thickness || "",

      category: item.category || "wall",
      room: item.room || "Ванная",
      material: item.material || "",
      color: item.color || "",
      finish: item.finish || "",

      description: item.description || "",

      featured: item.featured || false,

      stock:
        item.stock !== undefined
          ? item.stock
          : "",

      active:
        item.active !== undefined
          ? item.active
          : true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // СБРОС ФОРМЫ
  // =========================

  const resetForm = () => {
    setProduct(emptyProduct);

    setEditingId(null);

    setImageFile(null);

    setExistingImage("");

    setInteriorImageFiles([
      null,
      null,
      null,
    ]);

    setExistingInteriorImages([
      null,
      null,
      null,
    ]);
  };

  // =========================
  // УДАЛЕНИЕ
  // =========================

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Вы действительно хотите удалить этот товар?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Ошибка удаления"
        );
      }

      alert("Товар удалён");

      await loadProducts();
    } catch (err) {
      console.error(
        "Ошибка удаления:",
        err
      );

      alert(
        `Ошибка: ${err.message}`
      );
    }
  };

  // =========================
  // ВЫХОД
  // =========================

  const logout = () => {
    localStorage.removeItem("admin");

    navigate("/login");
  };

  // =========================
  // PREVIEW НОВОГО ФОТО
  // =========================

  const getPreviewUrl = (file) => {
    if (!file) {
      return "";
    }

    return URL.createObjectURL(file);
  };

  // =========================
  // UI
  // =========================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "40px 20px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1
          style={{
            color: "#d4b483",
            margin: 0,
          }}
        >
          Админ-панель TileStore
        </h1>

        <button
          onClick={logout}
          style={{
            background: "#d9534f",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Выйти
        </button>
      </div>

      {/* =========================
          FORM
      ========================= */}

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#1b1b1b",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 15px 50px rgba(0,0,0,.4)",
        }}
      >
        <h2
          style={{
            color: "#d4b483",
            marginTop: 0,
            marginBottom: "30px",
          }}
        >
          {editingId
            ? "Редактирование товара"
            : "Добавить товар"}
        </h2>

        {/* =========================
            НАЗВАНИЕ
        ========================= */}

        <input
          name="name"
          placeholder="Название товара"
          value={product.name}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* =========================
            БРЕНД
        ========================= */}

        <input
          name="brand"
          placeholder="Бренд"
          value={product.brand}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* =========================
            КОЛЛЕКЦИЯ
        ========================= */}

        <input
          name="collection"
          placeholder="Коллекция"
          value={product.collection}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* =========================
            ЦЕНА
        ========================= */}

        <input
          name="price"
          type="number"
          placeholder="Цена, ₸"
          value={product.price}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* =========================
            РАЗМЕР
        ========================= */}

        <input
          name="size"
          placeholder="Размер, например 60x60"
          value={product.size}
          onChange={handleChange}
          style={inputStyle}
        />

        

        {/* =========================
            МАТЕРИАЛ
        ========================= */}

        <input
          name="material"
          placeholder="Материал"
          value={product.material}
          onChange={handleChange}
          style={inputStyle}
        />

      

        

        {/* =========================
            КОМНАТА
        ========================= */}

        <select
          name="room"
          value={product.room}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Ванная">
            🛁 Ванная
          </option>

          <option value="Кухня">
            🍳 Кухня
          </option>

          <option value="Гостиная">
            🛋 Гостиная
          </option>

          <option value="Терраса">
            🌿 Терраса
          </option>
        </select>

        {/* =========================
            ТИП
        ========================= */}

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="wall">
            🧱 Настенная плитка
          </option>

          <option value="floor">
            ◼️ Напольная плитка
          </option>

          <option value="porcelain">
            🏢 Керамогранит
          </option>

          <option value="mosaic">
            🔹 Мозаика
          </option>

          <option value="outdoor">
            🌿 Уличная плитка
          </option>
        </select>

        {/* =========================
            ОПИСАНИЕ
        ========================= */}

        <textarea
          rows="5"
          name="description"
          placeholder="Описание товара"
          value={product.description}
          onChange={handleChange}
          style={{
            ...inputStyle,
            resize: "vertical",
          }}
        />

        {/* =========================
            ОСТАТОК
        ========================= */}

        <input
          name="stock"
          type="number"
          placeholder="Количество на складе"
          value={product.stock}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* =========================
            ГЛАВНОЕ ФОТО
        ========================= */}

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>
            Главное фото товара
          </h3>

          {existingImage && !imageFile && (
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <img
                src={existingImage}
                alt="Текущее фото"
                style={{
                  width: "220px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <p
                style={{
                  color: "#aaa",
                  fontSize: "13px",
                }}
              >
                Текущее фото
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
          />

          {imageFile && (
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <img
                src={getPreviewUrl(imageFile)}
                alt="Новое главное фото"
                style={{
                  width: "220px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <p
                style={{
                  color: "#aaa",
                  fontSize: "13px",
                }}
              >
                Новое фото будет загружено
              </p>
            </div>
          )}
        </div>

        {/* =========================
            3 ФОТО ИНТЕРЬЕРА
        ========================= */}

        <div style={sectionStyle}>
          <h3 style={sectionTitle}>
            3 фото интерьера
          </h3>

          <p
            style={{
              color: "#999",
              marginBottom: "20px",
            }}
          >
            Можно добавить до 3 примеров
            интерьера для этого кафеля.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "15px",
            }}
          >
            {[0, 1, 2].map((index) => {
              const oldImage =
                existingInteriorImages[index];

              const newFile =
                interiorImageFiles[index];

              return (
                <div
                  key={index}
                  style={{
                    background: "#111",
                    border:
                      "1px solid #333",
                    borderRadius: "15px",
                    padding: "12px",
                  }}
                >
                  <h4
                    style={{
                      color: "#d4b483",
                      marginTop: 0,
                    }}
                  >
                    Интерьер {index + 1}
                  </h4>

                  {/* СТАРОЕ ФОТО */}

                  {oldImage && !newFile && (
                    <div>
                      <img
                        src={oldImage}
                        alt={`Старый интерьер ${
                          index + 1
                        }`}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius:
                            "10px",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingInteriorImage(
                            index
                          )
                        }
                        style={{
                          width: "100%",
                          marginTop: "8px",
                          padding: "8px",
                          background:
                            "#8b3030",
                          color: "white",
                          border: "none",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        Удалить старое
                      </button>
                    </div>
                  )}

                  {/* НОВОЕ ФОТО */}

                  {newFile && (
                    <div>
                      <img
                        src={getPreviewUrl(
                          newFile
                        )}
                        alt={`Новый интерьер ${
                          index + 1
                        }`}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius:
                            "10px",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewInteriorImage(
                            index
                          )
                        }
                        style={{
                          width: "100%",
                          marginTop: "8px",
                          padding: "8px",
                          background:
                            "#d9534f",
                          color: "white",
                          border: "none",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        Убрать новое
                      </button>
                    </div>
                  )}

                  {/* НЕТ ФОТО */}

                  {!oldImage && !newFile && (
                    <div
                      style={{
                        height: "160px",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        border:
                          "1px dashed #555",
                        borderRadius:
                          "10px",
                        color: "#777",
                        marginBottom:
                          "10px",
                      }}
                    >
                      Нет фото
                    </div>
                  )}

                  {/* ВЫБОР ФАЙЛА */}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleInteriorImageChange(
                        index,
                        e.target.files?.[0] ||
                          null
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  />

                  <p
                    style={{
                      color: "#777",
                      fontSize: "12px",
                      marginBottom: 0,
                    }}
                  >
                    Выбор нового файла
                    заменит текущее фото.
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
            FEATURED
        ========================= */}

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "20px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={product.featured}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                featured:
                  e.target.checked,
              }))
            }
          />

          Показывать на главной
        </label>

        {/* =========================
            ACTIVE
        ========================= */}

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "15px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={product.active}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                active:
                  e.target.checked,
              }))
            }
          />

          Товар активен
        </label>

        {/* =========================
            КНОПКИ
        ========================= */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={saveProduct}
            disabled={loading}
            style={{
              flex: 1,
              background:
                loading
                  ? "#777"
                  : "#d4b483",
              color: "black",
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontSize: "17px",
              fontWeight: "700",
            }}
          >
            {loading
              ? "Сохранение..."
              : editingId
              ? "Сохранить изменения"
              : "Добавить товар"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              style={{
                background:
                  "#333",
                color: "white",
                border: "none",
                padding:
                  "16px 25px",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
              }}
            >
              Отмена
            </button>
          )}
        </div>
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      <h2
        style={{
          maxWidth: "1100px",
          margin:
            "70px auto 30px",
          textAlign: "center",
          color: "#d4b483",
        }}
      >
        Все товары
      </h2>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
        }}
      >
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              background:
                "#1b1b1b",
              borderRadius:
                "20px",
              padding: "20px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.4)",
            }}
          >
            {/* ГЛАВНАЯ КАРТИНКА */}

            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "15px",
                }}
              />
            ) : (
              <div
                style={{
                  height: "220px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    "#111",
                  borderRadius:
                    "15px",
                  color: "#777",
                }}
              >
                Нет главного фото
              </div>
            )}

            <h2
              style={{
                color: "white",
                marginTop:
                  "20px",
                marginBottom:
                  "10px",
              }}
            >
              {item.name}
            </h2>

            <p
              style={{
                color: "#aaa",
              }}
            >
              {item.description}
            </p>

            <p>
              <b>Размер:</b>{" "}
              {item.size ||
                "—"}
            </p>

            <p>
              <b>Материал:</b>{" "}
              {item.material ||
                "—"}
            </p>

            <p>
              <b>Комната:</b>{" "}
              {item.room ||
                "—"}
            </p>

            <p>
              <b>Интерьеров:</b>{" "}
              {item
                .interiorImages
                ?.length || 0}
              /3
            </p>

            {/* МИНИАТЮРЫ ИНТЕРЬЕРОВ */}

            {item.interiorImages
                ?.length > 0 && (
              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(3, 1fr)",
                  gap: "8px",
                  marginTop:
                    "15px",
                }}
              >
                {item.interiorImages.map(
                  (
                    image,
                    index
                  ) => (
                    <img
                      key={
                        index
                      }
                      src={
                        image
                      }
                      alt={`Интерьер ${
                        index +
                        1
                      }`}
                      style={{
                        width:
                          "100%",
                        height:
                          "90px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "8px",
                      }}
                    />
                  )
                )}
              </div>
            )}

            <h2
              style={{
                color:
                  "#d4b483",
                marginTop:
                  "20px",
              }}
            >
              {item.price} ₸
            </h2>

            {/* КНОПКИ */}

            <div
              style={{
                display:
                  "flex",
                gap: "10px",
                marginTop:
                  "20px",
              }}
            >
              <button
                onClick={() =>
                  editProduct(
                    item
                  )
                }
                style={{
                  flex: 1,
                  background:
                    "#d4b483",
                  color:
                    "black",
                  border:
                    "none",
                  padding:
                    "13px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
                }}
              >
                ✏️ Редактировать
              </button>

              <button
                onClick={() =>
                  deleteProduct(
                    item._id
                  )
                }
                style={{
                  flex: 1,
                  background:
                    "#d9534f",
                  color:
                    "white",
                  border:
                    "none",
                  padding:
                    "13px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
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

// =========================
// STYLES
// =========================

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  marginBottom: "12px",
  background: "#111",
  color: "white",
  border: "1px solid #333",
  borderRadius: "10px",
  outline: "none",
  fontSize: "15px",
};

const sectionStyle = {
  marginTop: "30px",
  padding: "20px",
  background: "#151515",
  borderRadius: "15px",
  border: "1px solid #2d2d2d",
};

const sectionTitle = {
  color: "#d4b483",
  marginTop: 0,
  marginBottom: "15px",
};

export default Admin;

