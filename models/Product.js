import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: "기타",
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10,
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    favorite: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags) {
          return tags.every(tag => typeof tag === 'string' && tag.length <= 5);
        },
        message: "태그는 5글자 이내로 입력하셔야 합니다."
      }
    }
  },
  {
    timestamps: true,
  }
);

// JS의 Product 모델 -> 몽고디비의 products 콜렉션에 대응
const Product = mongoose.model('Product', ProductSchema);

export default Product;