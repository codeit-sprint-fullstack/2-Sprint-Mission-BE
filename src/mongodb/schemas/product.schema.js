import { Schema } from 'mongoose';

const productSchema = new Schema(
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
    price: { type: Number, required: true, min: 1 },
    tags: { type: [String] },
    images: { type: [String] },
    favoriteCount: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    // 자동으로 생성해주는 collection을 사용하지 않고자 한다면 직접 명시할 수 있다.
    collection: 'products',
  }
);

export { productSchema };
