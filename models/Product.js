import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    tags: {
      type: [String]
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
