import { Link } from "react-router-dom";





const collections = [
  {
    title: "Marble Collection",
    subtitle: "Плитка под мрамор",
    image: "https://placehold.co/800x600?text=Marble",
    products: 24,
    type: "marble",
  },
  {
    title: "Wood Collection",
    subtitle: "Плитка под дерево",
    image: "https://placehold.co/800x600?text=Wood",
    products: 18,
    type: "wood",
  },
  {
    title: "Concrete Collection",
    subtitle: "Современный бетон",
    image: "https://placehold.co/800x600?text=Concrete",
    products: 30,
    type: "concrete",
  },
  {
    title: "Onyx Collection",
    subtitle: "Оникс Premium",
    image: "https://placehold.co/800x600?text=Onyx",
    products: 15,
    type: "onyx",
  },
  {
    title: "Stone Collection",
    subtitle: "Натуральный камень",
    image: "https://placehold.co/800x600?text=Stone",
    products: 22,
    type: "stone",
  },
];

export default function Collections() {
  return (
    <div
      style={{
        background: "#0b0b0b",
        minHeight: "100vh",
        padding: "120px 70px",
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
          color: "white",
          textAlign: "center",
          fontSize: "60px",
          marginBottom: "70px",
        }}
      >
        Наши коллекции
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
          gap: "40px",
        }}
      >
        {collections.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#151515",
              borderRadius: "30px",
              overflow: "hidden",
              transition: ".3s",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "30px" }}>
              <h2
                style={{
                  color: "white",
                  marginBottom: "15px",
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: "#bbb",
                  marginBottom: "20px",
                }}
              >
                {item.subtitle}
              </p>

              <p style={{ color: "#d4b483" }}>
                {item.products} моделей
              </p>

              <Link
                to={`/catalog?collection=${item.type}`}
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                  background: "#d4b483",
                  color: "black",
                  textDecoration: "none",
                  padding: "15px 28px",
                  borderRadius: "12px",
                  fontWeight: "600",
                }}
              >
                Смотреть →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}