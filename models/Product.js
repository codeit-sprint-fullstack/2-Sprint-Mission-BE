import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 30,
    },
    description: {
      maxLength: 30,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {},
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
