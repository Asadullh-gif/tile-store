import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: Math.max((item.quantity || 1) - 1, 1),
              }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "60px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#d4b483",
          border: "none",
          padding: "12px 22px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "30px",
          fontWeight: "600",
        }}
      >
        ← На главную
      </button>

      <h1
        style={{
          textAlign: "center",
          color: "#d4b483",
          marginBottom: "50px",
        }}
      >
        🛒 Корзина
      </h1>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "120px",
          }}
        >
          <h2>Корзина пуста</h2>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "30px",
              background: "#d4b483",
              border: "none",
              padding: "15px 35px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            {cart.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#1b1b1b",
                  borderRadius: "20px",
                  padding: "20px",
                  display: "flex",
                  gap: "25px",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h2>{item.name}</h2>

                  <p style={{ color: "#aaa" }}>
                    {item.description}
                  </p>

                  <p>
                    Размер: <b>{item.size}</b>
                  </p>

                  <p>
                    Материал: <b>{item.material}</b>
                  </p>

                  <h2 style={{ color: "#d4b483" }}>
                    {item.price} ₸
                  </h2>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <button
                    onClick={() => decrease(item._id)}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <h2>{item.quantity || 1}</h2>

                  <button
                    onClick={() => increase(item._id)}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      background: "#d9534f",
                      color: "white",
                      border: "none",
                      padding: "12px 18px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginLeft: "20px",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "50px",
              background: "#1b1b1b",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "right",
            }}
          >
            <h2>
              Общая сумма:
              <span style={{ color: "#d4b483" }}>
                {" "}
                {total.toLocaleString()} ₸
              </span>
            </h2>

            <button
              style={{
                marginTop: "20px",
                background: "#d4b483",
                color: "black",
                border: "none",
                padding: "18px 40px",
                borderRadius: "15px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;