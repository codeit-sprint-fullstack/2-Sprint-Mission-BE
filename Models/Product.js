import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 10,
      required: true,
    },
    description: {
      type: String,
      minLength: 10,
      maxLength: 100,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    tags: {
      type: String,
      maxLength: 5,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
