import express from "express";
import mongoose from 'mongoose';
import Product from "./models/Product.js";
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected to DB."))

const HttpStatus = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
	NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
});

const app = express();

app.use(cors());
app.use(express.json());

// useAsync hook
function asyncHandler(handler) {
	return (async function (req, res) {
		try {
			await handler(req, res);
		} catch (err) {
			console.log(err.name);
			console.log(err.message);
			if (err.name === "ValidationError") {
				res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
			}
			else if (err.name === "CastError") {
				res.status(HttpStatus.NOT_FOUND).send({ message: err.message });
			}
			else {
				res.status(HttpStatus.SERVER_ERROR).send({ message: err.message });
			}
		}
	});
}

app.post("/products", asyncHandler(async (req, res) => {
	const newProduct = await Product.create(req.body);
	res.send(newProduct);
}));

app.get("/products", asyncHandler(async (req, res) => {
	let page = req.query.page ? Number(req.query.page) : 0;
	if (isNaN(page)) { page = 0; }
	let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
	if (isNaN(pageSize)) { pageSize = 10; }
	const keyword = req.query.keyword;
	const query = keyword ? { $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }] } : {};
	const orderBy = req.query.orderBy;
	let sortOption;
	switch (orderBy) {
		case "favorite":
			sortOption = { favoriteCount: "desc" }
			break;
		case "recent":
		default:
			sortOption = { createdAt: "desc" };
	}

	const products = await Product.find(query).sort(sortOption).skip(page).limit(pageSize);
	const totalCount = await Product.countDocuments();
	res.send({ list: products, totalCount });
}));

app.get("/products/:id", asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);
	if (product) {
		res.send(product);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send({ message: "해당 id 에 대응하는 product 가 없습니다." });
	}
}));

// PUT 전체, PATCH 일부만
app.patch("/products/:id", asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);
	if (product) {
		Object.keys(req.body).forEach(key => {
			product[key] = req.body[key];
		});
		await product.save();
		res.send(product);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send({"message": "해당 id 에 대응하는 product 가 없습니다."});
	}
}));

app.delete("/products/:id", asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findByIdAndDelete(id);
	if (product) {
		res.status(HttpStatus.NO_CONTENT).send(product);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send();
	}
}));

app.listen(process.env.PORT || 3000, () => console.log("Server on"));
console.log("Hi!");
