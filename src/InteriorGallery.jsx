import { useState } from "react";

function InteriorGallery({ product }) {
  const images =
    product.interiorImages?.length > 0
      ? product.interiorImages
      : product.interiorImage
        ? [product.interiorImage]
        : [];

  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "50px" }}>

      <h2
        style={{
          fontSize: "30px",
          marginBottom: "25px",
        }}
      >
        Примеры интерьера
      </h2>

      {/* Большая фотография */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <img
          src={images[selectedImage]}
          alt={`Интерьер ${selectedImage + 1}`}
          style={{
            width: "100%",
            height: "550px",
            objectFit: "cover",
            borderRadius: "20px",
            display: "block",
          }}
        />
      </div>

      {/* Маленькие фотографии */}
      {images.length > 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "15px",
            maxWidth: "1000px",
            margin: "15px auto 0",
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Интерьер ${index + 1}`}
              onClick={() =>
                setSelectedImage(index)
              }
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "12px",
                cursor: "pointer",

                border:
                  selectedImage === index
                    ? "3px solid #d4b483"
                    : "3px solid transparent",

                opacity:
                  selectedImage === index
                    ? 1
                    : 0.7,

                transition: "0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default InteriorGallery;