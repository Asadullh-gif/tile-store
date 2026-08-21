const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
  // Основное
  name: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    default: "",
  },

  collection: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    required: true,
  },

  size: {
    type: String,
    default: "",
  },

  // Размер
  width: Number,
  height: Number,
  thickness: Number,

  // Категория
  category: {
    type: String,
    default: "wall",
  },

  room: String,

  material: String,

  color: String,

  finish: String,

  description: String,

  featured: {
    type: Boolean,
    default: false,
  },

  // Картинка карточки товара
  image: String,

 // 3 фото интерьера
interiorImages: {
  type: [String],
  default: [],
  validate: {
    validator: function (images) {
      return images.length <= 3;
    },
    message: "Можно загрузить максимум 3 фото интерьера",
  },
},

slug: {
  type: String,
  unique: true,
  index: true,
},


  // Все текстуры плитки
  textures: {
    color: String,
    normal: String,
    roughness: String,
    ao: String,
    displacement: String,
    metalness: String,
  },

  // Остаток
  stock: {
    type: Number,
    default: 0,
  },

  // Активен ли товар
  active: {
    type: Boolean,
    default: true,
  },



  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
});


module.exports = mongoose.model("Product", ProductSchema);