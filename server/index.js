const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config({
  path: "../.env"
});

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// CLOUDINARY
// =========================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =========================
// MULTER + CLOUDINARY
// =========================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tilestore/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image"
  },
});

const upload = multer({ storage });


const getFileByField = (files, fieldname) => {
  return files?.find((file) => file.fieldname === fieldname);
};

// =========================
// MONGODB
// =========================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => console.log("Ошибка MongoDB:", err));

// =========================
// ДОБАВИТЬ ТОВАР
// =========================

app.post(
  "/products",
  upload.any(),
  async (req, res) => {
    try {
      console.log("🔥 POST /products ПОЛУЧЕН");
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const imageFile = getFileByField(req.files, "image");
      const interiorImageFile = getFileByField(
        req.files,
        "interiorImage"
      );

      console.log("🖼 image:", imageFile?.fieldname);
      console.log("🏠 interiorImage:", interiorImageFile?.fieldname);

      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        material: req.body.material,
        room: req.body.room,
        type: req.body.type,
        description: req.body.description,
        featured: req.body.featured === "true",

        image: imageFile?.path || "",

        interiorImage: interiorImageFile?.path || "",
      });

      await product.save();

      console.log("✅ Товар успешно добавлен:", product);

      res.json(product);

    } catch (err) {
      console.error("❌ Ошибка POST:", err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

// =========================
// ИЗМЕНИТЬ ТОВАР
// =========================

app.put(
  "/products/:id",
  upload.any(),
  async (req, res) => {
    try {
      console.log("🔥 PUT /products/:id");
      console.log("ID:", req.params.id);
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const imageFile = getFileByField(
        req.files,
        "image"
      );

      const interiorImageFile = getFileByField(
        req.files,
        "interiorImage"
      );

      const updateData = {
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        material: req.body.material,
        room: req.body.room,
        type: req.body.type,
        description: req.body.description,
        featured: req.body.featured === "true",
      };

      if (imageFile) {
        updateData.image = imageFile.path;

        console.log(
          "🖼 Новая image:",
          imageFile.path
        );
      }

      if (interiorImageFile) {
        updateData.interiorImage =
          interiorImageFile.path;

        console.log(
          "🏠 Новая interiorImage:",
          interiorImageFile.path
        );
      }

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!product) {
        return res.status(404).json({
          message: "Товар не найден",
        });
      }

      console.log(
        "✅ Товар после изменения:",
        product
      );

      res.json(product);

    } catch (err) {
      console.error("❌ Ошибка PUT:", err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);
// =========================
// ПОЛУЧИТЬ ТОВАРЫ
// =========================

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =========================
// УДАЛИТЬ ТОВАР
// =========================

app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Товар удален",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =========================
// SERVER
// =========================

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:");
  console.error("name:", err.name);
  console.error("message:", err.message);
  console.error("field:", err.field);
  console.error("code:", err.code);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
      field: err.field,
      code: err.code,
    });
  }

  res.status(500).json({
    message: err.message || "Ошибка сервера",
  });
});





const PORT = process.env.PORT || 3000;



const PORT = process.env.PORT || 3000;

console.log("🚀 SERVER VERSION 2 - upload.any()");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});