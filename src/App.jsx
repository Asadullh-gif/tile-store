import { useEffect, useState } from "react";
import heron from "./assets/heron.png"
import bath from "./assets/bath.jpg";
import kitchen from "./assets/kitchen.jpg";
import living from "./assets/living.jpg";
import kafel from "./assets/kafel.jpg";
import { Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog.jsx";
import Admin from "./pages/Admin/admin.jsx";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import { Link, useLocation } from "react-router-dom";
import Collections from "./pages/Collections/collections.jsx";
import Constructor from "./pages/Constructor/Constructor.jsx";
import Footer from "./Components/UI/Footer";



const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "19px",
  fontWeight: "500",
  letterSpacing: "1px",
  transition: ".3s",
};


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Routes>
      <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      <Route path="/catalog" element={<Catalog cart={cart} setCart={setCart} />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/constructor" element={<Constructor />}/>
    </Routes>
  );
}

function NavItem({ to, children }) {
  const location = useLocation();

  const active = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        position: "relative",
        color: active ? "#d4b483" : "white",
        textDecoration: "none",
        fontSize: "19px",
        fontWeight: "500",
        letterSpacing: "1px",
        paddingBottom: "8px",
        transition: ".3s",
      }}
    >
      {children}

      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: active ? "100%" : "0%",
          height: "2px",
          background: "#d4b483",
          transition: ".3s",
        }}
      />
    </Link>
  );
}

function Home({cart, setCart}) {
const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {
      console.log(data);   // ← добавь
      setProducts(data);
    });
}, []);

  const featuredProducts = products.filter(
  product => product.featured
);

const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(search.toLowerCase()) &&
  search.trim() !== ""
);
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  
  const projects = [
  {
    id: 1,
    title: "Ванная комната",
    subtitle: "Керамогранит под мрамор",
    image: bath,
  },
  {
    id: 2,
    title: "Современная кухня",
    image: kitchen,
  },
  {
    id: 3,
    title: "Гостиная",
    image: living,
  },
];



const addToCart = (product) => {
  setCart([...cart, product]);

  alert("Товар добавлен в корзину");
};
  return(

      
          
<div>

      <header
  style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "90px",

  background: "rgba(18,18,18,.72)",

  backdropFilter: "blur(20px)",

  borderBottom: "1px solid rgba(212,180,131,.15)",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "0 70px",

  zIndex: 1000,

  transition: ".35s",
}}
>
  <h2
  style={{
    color: "white",
    fontSize: "54px",
    fontWeight: "700",
    letterSpacing: "-2px",
    cursor: "pointer",
    transition: ".3s",
    margin: 0,
  }}
  onMouseEnter={(e) => {
    e.target.style.color = "#d4b483";
    e.target.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.target.style.color = "white";
    e.target.style.transform = "scale(1)";
  }}
>
  TileStore
</h2>

  <nav
  style={{
    display: "flex",
    alignItems: "center",
    gap: "50px",
  }}
>
  
  <NavItem to="/">Главная</NavItem>

<div
  style={{
    position: "relative",
  }}
  onMouseEnter={() => setShowCatalog(true)}
  onMouseLeave={() => setShowCatalog(false)}
>
  <Link
  to="/catalog"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "19px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  Каталог ▼
</Link>

  {showCatalog && (
    <div
      style={{
        position: "absolute",
        top: "45px",
        left: 0,

        width: "320px",

        background: "#151515",

        borderRadius: "20px",

        padding: "15px",

        boxShadow: "0 20px 60px rgba(0,0,0,.45)",

        border: "1px solid rgba(212,180,131,.15)",

        zIndex: 9999,
      }}
    >
      {[
  { name: "🛁 Ванная", type: "bathroom" },
  { name: "🍳 Кухня", type: "kitchen" },
  { name: "🛋 Гостиная", type: "living" },
  { name: "🏢 Керамогранит", type: "porcelain" },
  { name: "🌿 Уличная плитка", type: "outdoor" },
].map((item) => (
        <Link
  key={item.type}
  to={`/catalog?type=${item.type}`}
  style={{
    display: "block",
    padding: "16px",
    borderRadius: "14px",
    color: "white",
    textDecoration: "none",
    transition: ".25s",
    fontSize: "17px",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#242424";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
  }}
>
  {item.name}
</Link>
      ))}
    </div>
  )}
</div>

<NavItem to="/collections">Коллекции</NavItem>

<NavItem to="/contacts">Контакты</NavItem>

  <Link
    to="/cart"
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "rgba(255,255,255,.08)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255,255,255,.15)",
      color: "white",
      textDecoration: "none",
      transition: ".35s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#d4b483";
      e.currentTarget.style.color = "#111";
      e.currentTarget.style.transform = "scale(1.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,.08)";
      e.currentTarget.style.color = "white";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    <span style={{ fontSize: "28px" }}>🛒</span>

    {cart.length > 0 && (
      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "#ff3b30",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        {cart.length}
      </span>
    )}
  </Link>
</nav>

<div
  style={{
    position: "relative",
  }}
>
  <input
    type="text"
    placeholder="Поиск плитки..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setShowSearch(true);
    }}
    onBlur={() => setTimeout(() => setShowSearch(false), 200)}
    onFocus={() => setShowSearch(true)}
    style={{
      width: "330px",
      height: "58px",
      borderRadius: "40px",
      background: "rgba(255,255,255,.08)",
      border: "1px solid rgba(255,255,255,.12)",
      color: "white",
      paddingLeft: "25px",
      fontSize: "17px",
      outline: "none",
    }}
  />

  {showSearch && (
    <div
      style={{
        position: "absolute",
        top: "70px",
        left: 0,
        width: "100%",
        background: "#181818",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        zIndex: 9999,
      }}
    >
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          onClick={() => {
            setSelectedProduct(product);
            setSearch("");
            setShowSearch(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "15px",
            cursor: "pointer",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <div>
            <div style={{ color: "white" }}>
              {product.name}
            </div>

            <div style={{ color: "#d4b483" }}>
              {product.price} ₸
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

</header>

      <section
  style={{
    height: "100vh",
    backgroundImage : `url(${heron})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "0 80px",
  }}
>
  {/* Темное затемнение слева */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2), transparent)",
    }}
  />

  {/* Текст */}
 <div 
  style={{
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    maxWidth: "700px",
    marginLeft: "70px",
  }}
>
  <span
    style={{
      color: "#d4b483",
      fontSize: "26px",
      letterSpacing: "4px",
      marginBottom: "25px",
    }}
  >
    ПРЕМИАЛЬНАЯ ПЛИТКА
  </span>

  <h1
    style={{
      fontSize: "72px",
      color: "white",
      lineHeight: "1.1",
      margin: 0,
      fontWeight: "700",
    }}
  >
    Создайте интерьер
    <br />
    своей мечты
  </h1>

  <div
    style={{
      width: "90px",
      height: "4px",
      background: "#d4b483",
      margin: "35px 0",
    }}
  />

  <p
    style={{
      fontSize: "24px",
      color: "white",
      lineHeight: "1.5",
      margin: 0,
      maxWidth: "550px",
    }}
  >
    Широкий выбор керамогранита и плитки
    для вашего идеального пространства
  </p>
    <Link to="/constructor">
  <button
    style={{
      background: "#d4b483",
      color: "black",
      border: "none",
      padding: "20px 45px",
      fontSize: "22px",
      borderRadius: "15px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Начать проект →
  </button>
</Link>
  </div>
</section>

<section
  style={{
    background: "#0d0d0d",
    padding: "140px 80px",
  }}
>
  <h2
    style={{
      color: "white",
      fontSize: "60px",
      textAlign: "center",
      marginBottom: "90px",
    }}
  >
    Почему выбирают TileStore
  </h2>

 

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
      gap: "35px",
    }}
  >
    <div
  style={{
    background: "#111",
    borderRadius: "30px",
    padding: "60px 40px",
    textAlign: "center",
    transition: "0.4s",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-15px)";
    e.currentTarget.style.background = "#171717";
    e.currentTarget.style.boxShadow =
      "0 30px 60px rgba(212,180,131,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = "#111";
    e.currentTarget.style.boxShadow = "none";
  }}
>
      <h3
        style={{
          color: "#d4b483",
          fontSize: "40px",
        }}
      >
        <div
  style={{
    width: "70px",
    height: "4px",
    background: "#d4b483",
    margin: "0 auto 35px",
    borderRadius: "20px",
  }}
/>
<h1
  style={{
    fontSize: "60px",
    color: "#d4b483",
    opacity: "0.25",
    margin: 0,
    fontWeight: "700",
  }}
>
  01
</h1>
        01
      </h3>

      <h4
        style={{
          color: "white",
          fontSize: "32px",
        }}
      >
        Итальянский дизайн
      </h4>

      <p
        style={{
          color: "#888",
          fontSize: "20px",
          lineHeight: "1.8",
        }}
      >
        Современные коллекции для роскошных интерьеров.
      </p>
    </div>

  <div
  style={{
    background: "#111",
    borderRadius: "30px",
    padding: "60px 40px",
    textAlign: "center",
    transition: "0.4s",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-15px)";
    e.currentTarget.style.background = "#171717";
    e.currentTarget.style.boxShadow =
      "0 30px 60px rgba(212,180,131,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = "#111";
    e.currentTarget.style.boxShadow = "none";
  }}
>
      <h3
        style={{
          color: "#d4b483",
          fontSize: "40px",
        }}
      >
        <div
  style={{
    width: "70px",
    height: "4px",
    background: "#d4b483",
    margin: "0 auto 35px",
    borderRadius: "20px",
  }}
/>
<h1
  style={{
    fontSize: "60px",
    color: "#d4b483",
    opacity: "0.25",
    margin: 0,
    fontWeight: "700",
  }}
>
  02
</h1>
        02
      </h3>

      <h4
        style={{
          color: "white",
          fontSize: "32px",
        }}
      >
        Большие форматы
      </h4>

      <p
        style={{
          color: "#888",
          fontSize: "20px",
          lineHeight: "1.8",
        }}
      >
        Керамогранит 60×120, 120×120 и широкоформатные плиты.
      </p>
    </div>

   <div
  style={{
    background: "#111",
    borderRadius: "30px",
    padding: "60px 40px",
    textAlign: "center",
    transition: "0.4s",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-15px)";
    e.currentTarget.style.background = "#171717";
    e.currentTarget.style.boxShadow =
      "0 30px 60px rgba(212,180,131,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = "#111";
    e.currentTarget.style.boxShadow = "none";
  }}
>
      <h3
        style={{
          color: "#d4b483",
          fontSize: "40px",
        }}
      >
        <div
  style={{
    width: "70px",
    height: "4px",
    background: "#d4b483",
    margin: "0 auto 35px",
    borderRadius: "20px",
  }}
/>
<h1
  style={{
    fontSize: "60px",
    color: "#d4b483",
    opacity: "0.25",
    margin: 0,
    fontWeight: "700",
  }}
>
  03
</h1>
        03
      </h3>

      <h4
        style={{
          color: "white",
          fontSize: "32px",
        }}
      >
        Премиальный сервис
      </h4>

      <p
        style={{
          color: "#888",
          fontSize: "20px",
          lineHeight: "1.8",
        }}
      >
        Подбор коллекций, консультации и помощь дизайнеров.
      </p>
    </div>
  </div>
</section>

<section
  style={{
    background: "#050505",
    padding: "120px 80px",
  }}
>
  <h2
    style={{
      color: "white",
      fontSize: "60px",
      textAlign: "center",
      marginBottom: "80px",
    }}
  >
    Наши проекты
  </h2>
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "35px",
  }}
>
 

</div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "40px",
    }}
  >
    


    {projects.map((project) => (
      <div
        key={project.id}
        style={{
          position: "relative",
          borderRadius: "30px",
          overflow: "hidden",
          height: "500px",
          cursor: "pointer",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius:"20px",
            marginBottom:"25px"
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          }}
        />

        <h3
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            color: "white",
            fontSize: "36px",
            margin: 0,
          }}
        >
          {project.title}
        </h3>
      </div>
    ))}

    {featuredProducts.map((product) => (
      <div 
        key={product._id} 
        style={{ 
          background: "#151515", 
          color: "white", 
          padding: "25px", 
          borderRadius: "25px", 
          textAlign: "center", 
          boxShadow: "0 20px 50px rgba(0,0,0.4)", 
          transition:"0.3s", 
        }} 
      > 
            <img 
            src={product.image} 
            alt={product.name} 
            style={{
              width: "90%", 
              height: "220px", 
              objectFit: "cover", 
              borderRadius: "20px", 
              marginBottom: "25px", 
              }} 
              /> 
              <h1 
              style={
                {color: "white", 
                marginBottom: "15px"}}
                >
                   {product.name} 
                   </h1> 
                   <p style={{color: '#ccc'}}> 
                    {product.description} </p> 
                   <p style={{color: '#ccc'}}> 
                    Размер: {product.size} </p> 
                   <p style={{color: '#ccc'}}> 
                    Материал: {product.material} </p> 
                   <h1 style={
                    { color: "#d4b483", 
                    
                    matginTop: "20px", 
                    }}> 
                    {product.price} ₸ 
                    </h1> 
                    <div 
                    style={{ 
                      display: "flex", 
                      justifyContent: "center", 
                      gap: "15px", matginTop: "25px", 
                      }}> 
                      <button 
                      style={{ 
                        
                        background: "#d4b483", 
                        border: "none", 
                        padding: "15px 25px", 
                        borderRadius: "12px", 
                        cursor: "pointer", 
                        fontWeight: "600", 
                        }} 
                        > Подробнее 
                        </button> 
                        <button 
                        onClick={() => addToCart(product)} 
                        style={{ 
                          background: "transparent", 
                          border: "1px solid #d4b483", 
                          color: "#d4b483", 
                          padding: "15px 25px", 
                          borderRadius: "12px", 
                          cursor: "pointer", 
                          }} 
                          > 
                          🛒 В корзину 
                          </button> 
                      </div>
                    </div>
                  
                ))}
              </div>
            </section>

  
<Footer />

</div>
   
  );
}


export default App;