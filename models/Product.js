import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
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
    }
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
