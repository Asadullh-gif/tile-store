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

      <p>📍 Алматы, Казахстан</p>

      <p>📞 +7 (747) 501-82-01</p>
      <p>📞 +7 (707) 912-98-28</p>

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
          href="https://wa.me/77475018201"
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp
            size={35}
            color="#25D366"
          />
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