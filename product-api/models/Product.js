import mongoose from "mongoose";

// MongoDB Collection Products 의 구조.
const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLengh: 1,
		maxLength: 10,
	},
	description: {
		type: String,
		minLength: 10,
		maxLength: 100,
	},
	price: {
		type: Number,
		validate: {
			validator: (v) => {
				return !isNaN(v) && Number(v) >= 0;
			},
			message: "Price must be a number which is larger or equal than 0."
		}
	},
	tags: {
		type: [String],
		maxLength: 10,
	},
	images: {
		type: [String],
		required: true,
	},
	favoriteCount: {
		type: Number,
		default: 0,
	}
}, {
	timestamps: true, // createdAt, updatedAt 이 자동으로...
});

const Product = mongoose.model('Product', ProductSchema); // Product -> Products 몽고 콜렉션

export default Product;
