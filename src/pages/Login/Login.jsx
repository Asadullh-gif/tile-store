import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = () => {
    if (login === "Mukhammed" && password === "1977") {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#1b1b1b",
          padding: "40px",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            color: "#d4b483",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Вход в админ-панель
        </h1>

        <input
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "25px",
          }}
        />

        <button
          onClick={signIn}
          style={{
            width: "100%",
            padding: "15px",
            background: "#d4b483",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;