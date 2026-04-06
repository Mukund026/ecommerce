const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  listPrice: {
    type: Number
  },
  category: {
    type: String,
    required: true
  },
  categoryName: {
    type: String
  },
  subcategory: {
    type: String
  },
  image: {
    type: String
  },
  imgUrl: {
    type: String
  },
  stars: {
    type: Number,
    min: 0,
    max: 5
  },

  reviews: {
    type: Number,
    default: 0
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{ timestamps: true});

productSchema.index({ name: "text", title: "text", description: "text", categoryName: "text" });
productSchema.index({ categoryName: 1 });
productSchema.index({ subcategory: 1 });
productSchema.index({ categoryName: 1, subcategory: 1 });

productSchema.index({ categoryName: 1, name: 1 });
productSchema.index({ categoryName: 1, title: 1 });

module.exports = mongoose.model("Product", productSchema);
