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
const SITE_URL = "https://tile-store-b7wm.vercel.app";

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

async function createUniqueSlug(name, excludeId = null) {
  let slug = createSlug(name);

  const query = {
    slug,
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await Product.findOne(query);

  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-6)}`;
  }

  return slug;
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
        slug: await createUniqueSlug(req.body.name),
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
        slug: await createUniqueSlug(req.body.name, req.params.id),
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
// ПОЛУЧИТЬ ТОВАР ПО SLUG
// =========================

app.get("/products/slug/:slug", async (req, res) => {
  try {
    console.log("🔥 GET /products/slug/:slug");
    console.log("SLUG:", req.params.slug);

    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        message: "Товар не найден",
      });
    }

    res.json(product);

  } catch (err) {
    console.error(
      "❌ Ошибка получения товара по slug:",
      err
    );

    res.status(500).json({
      message: err.message,
    });
  }
});



// =========================
// SITEMAP.XML
// =========================

app.get("/sitemap.xml", async (req, res) => {
  try {
    console.log("🔥 GET /sitemap.xml");

    const products = await Product.find({
  slug: { $exists: true, $ne: "" },
})
  .select("slug updatedAt createdAt")
  .lean();

    const staticPages = [
  {
    url: "/",
    priority: "1.0",
  },
  {
    url: "/catalog",
    priority: "0.9",
  },
  {
    url: "/collections",
    priority: "0.8",
  },
  {
    url: "/constructor",
    priority: "0.7",
  },
];

    const productPages = products.map((product) => ({
      url: `/product/${product.slug}`,
      lastmod:
        product.updatedAt ||
        product.createdAt ||
        new Date(),
      priority: "0.8",
    }));

    const allPages = [
      ...staticPages,
      ...productPages,
    ];

    const urls = allPages
      .map((page) => {
        const lastmod = page.lastmod
          ? new Date(page.lastmod)
              .toISOString()
              .split("T")[0]
          : null;

        return `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    ${
      lastmod
        ? `<lastmod>${lastmod}</lastmod>`
        : ""
    }
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;

    res.header(
      "Content-Type",
      "application/xml"
    );

    res.send(sitemap);

  } catch (err) {
    console.error(
      "❌ Ошибка создания sitemap:",
      err
    );

    res.status(500).send(
      "Ошибка создания sitemap"
    );
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



app.get("/admin/check-slugs", async (req, res) => {
  try {
    const products = await Product.find(
      {},
      {
        _id: 1,
        name: 1,
        slug: 1,
      }
    );

    res.json(products);
  } catch (err) {
    console.error("Ошибка проверки slug:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});