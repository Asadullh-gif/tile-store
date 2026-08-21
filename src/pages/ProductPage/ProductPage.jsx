import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://my-backend-j4fz.onrender.com";

function ProductPage({ cart, setCart }) {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedInterior, setSelectedInterior] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/products/slug/${slug}`);

        if (!res.ok) {
          throw new Error("Товар не найден");
        }

        const data = await res.json();

        setProduct(data);
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const addToCart = () => {
    if (!product) return;

    setCart((prevCart) => [...prevCart, product]);

    alert("Товар добавлен в корзину");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
        }}
      >
        Загрузка товара...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h1>Товар не найден</h1>

        <Link
          to="/catalog"
          style={{
            background: "#d4b483",
            color: "#111",
            padding: "14px 25px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const interiorImages =
    Array.isArray(product.interiorImages)
      ? product.interiorImages
      : product.interiorImage
      ? [product.interiorImage]
      : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "40px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/catalog"
          style={{
            background: "#d4b483",
            color: "#111",
            padding: "13px 22px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          ← Каталог
        </Link>

        <Link
          to="/cart"
          style={{
            color: "#d4b483",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "17px",
          }}
        >
          🛒 Корзина
        </Link>
      </div>

      {/* PRODUCT */}

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "50px",
          alignItems: "start",
        }}
      >
        {/* LEFT */}

        <div>
          <img
            src={product.image}
            alt={product.name}
            onClick={() => setSelectedImage(product.image)}
            style={{
              width: "100%",
              maxHeight: "650px",
              objectFit: "cover",
              borderRadius: "20px",
              cursor: "zoom-in",
              boxShadow: "0 20px 60px rgba(0,0,0,.4)",
            }}
          />

          {/* INTERIOR */}

          {interiorImages.length > 0 && (
            <div style={{ marginTop: "35px" }}>
              <h2
                style={{
                  color: "#d4b483",
                  marginBottom: "20px",
                }}
              >
                Интерьеры
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, 1fr)",
                  gap: "15px",
                }}
              >
                {interiorImages.map(
                  (image, index) => (
                    <img
                      key={image + index}
                      src={image}
                      alt={`Интерьер ${index + 1}`}
                      onClick={() =>
                        setSelectedInterior(image)
                      }
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "15px",
                        cursor: "zoom-in",
                      }}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}

        <div
          style={{
            background: "#1b1b1b",
            padding: "35px",
            borderRadius: "25px",
            position: "sticky",
            top: "30px",
          }}
        >
          <p
            style={{
              color: "#999",
              marginBottom: "10px",
            }}
          >
            {product.brand || "TileStore"}
          </p>

          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 20px",
            }}
          >
            {product.name}
          </h1>

          <h2
            style={{
              color: "#d4b483",
              fontSize: "32px",
              marginBottom: "30px",
            }}
          >
            {product.price} ₸
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, 1fr)",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background: "#111",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <span style={{ color: "#888" }}>
                Размер
              </span>

              <br />

              <strong>{product.size || "—"}</strong>
            </div>

            <div
              style={{
                background: "#111",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <span style={{ color: "#888" }}>
                Материал
              </span>

              <br />

              <strong>
                {product.material || "—"}
              </strong>
            </div>

            <div
              style={{
                background: "#111",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <span style={{ color: "#888" }}>
                Помещение
              </span>

              <br />

              <strong>
                {product.room || "—"}
              </strong>
            </div>

            <div
              style={{
                background: "#111",
                padding: "18px",
                borderRadius: "12px",
              }}
            >
              <span style={{ color: "#888" }}>
                Категория
              </span>

              <br />

              <strong>
                {product.category || "—"}
              </strong>
            </div>
          </div>

          {product.description && (
            <div style={{ marginBottom: "30px" }}>
              <h3>Описание</h3>

              <p
                style={{
                  color: "#aaa",
                  lineHeight: "1.7",
                  fontSize: "16px",
                }}
              >
                {product.description}
              </p>
            </div>
          )}

          <button
            onClick={addToCart}
            style={{
              width: "100%",
              padding: "18px",
              background: "#d4b483",
              color: "#111",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            🛒 Добавить в корзину
          </button>
        </div>
      </div>

      {/* MAIN IMAGE MODAL */}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "30px",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
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
            }}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt={product.name}
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              maxWidth: "95%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "15px",
            }}
          />
        </div>
      )}

      {/* INTERIOR MODAL */}

      {selectedInterior && (
        <div
          onClick={() =>
            setSelectedInterior(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "30px",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedInterior(null);
            }}
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
            }}
          >
            ×
          </button>

          <img
            src={selectedInterior}
            alt="Интерьер"
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              maxWidth: "95%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "15px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductPage;