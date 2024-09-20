import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 10,
    },
    description: {
      type: String,
      minLength: 10,
      maxLength: 100,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
    },
    favoriteCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, //createdAt,updatedAt 생성,스키마 옵션임.
  }
);

const Item = mongoose.model("Item", ProductSchema);

export default Item;
