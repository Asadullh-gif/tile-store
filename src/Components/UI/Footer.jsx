import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#151515",
        color: "white",
        padding: "40px",
        marginTop: "5px",
        borderTop: "1px solid #2f2f2f",
      }}
    >
      <h1
        style={{
          color: "#d4b483",
        }}
      >
        TileStore
      </h1>

      <p>📍 Алматы, Строй сити ангар №132 </p>
      <p>📞 +7 (707) 912-92-28</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <a
          href="https://www.instagram.com/132_angar_stroysiti?igsh=eDZkZnVnZjBoM3pp"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram
            size={35}
            color="#9a3552"
          />
        </a>

        <a
          href="https://wa.me/77079129228"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp
            size={35}
            color="#25D366"
          />
        </a>
<a
  href="https://www.google.com/maps/search/?api=1&query=ТВОЙ_АДРЕС"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
    color: "#222",
  }}
>
  <div
    style={{
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "#d4b483",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  </div>

  <div>
    <div style={{ fontWeight: "700" }}>
      Наш магазин
    </div>

    <div style={{ color: "#777", marginTop: "3px" }}>
      Алматы, ул. Абая, 25
    </div>
  </div>
</a>


      </div>

      <p
        style={{
          marginTop: "30px",
          color: "#888",
        }}
      >
        © 2026 TileStore
      </p>
    </footer>
  );
}