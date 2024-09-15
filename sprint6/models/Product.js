import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
    price: {
      type: Number,
      equired: true,
      default: 1,
      min: 1,
    },
    tag: {
      type: [String],
      equired: true,
    },
    image: {
      type: [String],
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema); //products라는 컬렉션에 추가하고 삭제하기

export default Product;
