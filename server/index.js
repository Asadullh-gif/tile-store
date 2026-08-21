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


function createSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

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

console.log("🔥 MULTER UPLOAD MODE: ANY");
console.log("🔥 Multer version:", require("multer/package.json").version);


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

      // Главное фото товара
      const imageFile = getFileByField(req.files, "image");

      // 3 фотографии интерьера
      const interiorImages = (req.files || [])
        .filter((file) =>
          ["interiorImage1", "interiorImage2", "interiorImage3"]
            .includes(file.fieldname)
        )
        .sort((a, b) =>
          a.fieldname.localeCompare(b.fieldname)
        )
        .map((file) => file.path);

      console.log("🖼 image:", imageFile?.path);
      console.log("🏠 interiorImages:", interiorImages);

      const product = new Product({
        name: req.body.name,
        slug: createSlug(req.body.name),
        price: req.body.price,
        size: req.body.size,
        material: req.body.material,
        room: req.body.room,
        type: req.body.type,
        description: req.body.description,
        featured: req.body.featured === "true",

        image: imageFile?.path || "",

        interiorImages: interiorImages,
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

      const newInteriorImages = (req.files || [])
        .filter((file) =>
          ["interiorImage1", "interiorImage2", "interiorImage3"]
            .includes(file.fieldname)
        )
        .sort((a, b) =>
          a.fieldname.localeCompare(b.fieldname)
        )
        .map((file) => file.path);

      const updateData = {
        name: req.body.name,
        slug: createSlug(req.body.name),
        price: req.body.price,
        size: req.body.size,
        material: req.body.material,
        room: req.body.room,
        type: req.body.type,
        description: req.body.description,
        featured: req.body.featured === "true",
      };

      // Новое главное фото
      if (imageFile) {
        updateData.image = imageFile.path;

        console.log(
          "🖼 Новая image:",
          imageFile.path
        );
      }

      // Новые интерьеры
      if (newInteriorImages.length > 0) {
        updateData.interiorImages = newInteriorImages;

        console.log(
          "🏠 Новые interiorImages:",
          newInteriorImages
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
// ПОЛУЧИТЬ ВСЕ ТОВАРЫ
// =========================

app.get("/products", async (req, res) => {
  try {
    console.log("🔥 GET /products");

    const products = await Product.find().sort({
      createdAt: -1,
    });

    console.log(`📦 Найдено товаров: ${products.length}`);

    res.json(products);

  } catch (err) {
    console.error("❌ Ошибка GET /products:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});


app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Товар не найден",
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Ошибка получения товара:", err);

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





console.log("🚀 SERVER VERSION 2 - upload.any()");




app.get("/admin/create-slugs", async (req, res) => {
  try {
    const products = await Product.find({
      $or: [
        { slug: { $exists: false } },
        { slug: "" },
        { slug: null },
      ],
    });

    let updated = 0;

    for (const product of products) {
      let slug = createSlug(product.name);

      // Если такой slug уже существует
      const existing = await Product.findOne({
        slug,
        _id: { $ne: product._id },
      });

      if (existing) {
        slug = `${slug}-${product._id
          .toString()
          .slice(-6)}`;
      }

      product.slug = slug;

      await product.save();

      updated++;

      console.log(
        `✅ ${product.name} → ${product.slug}`
      );
    }

    res.json({
      message: "Slug успешно созданы",
      updated,
    });
  } catch (err) {
    console.error(
      "❌ Ошибка создания slug:",
      err
    );

    res.status(500).json({
      message: err.message,
    });
  }
});



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});