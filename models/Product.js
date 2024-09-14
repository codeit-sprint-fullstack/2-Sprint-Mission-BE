import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 30,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: { 
      type: [String]
    },
    favoriteCount: {
      type: Number, 
      default: 0, 
      min: 0
    },
  },
  {
    timestamps: true, //createdAt,updatedAt 생성,스키마 옵션임.
  }
);

const Item = mongoose.model("Item", ProductSchema);

export default Item;