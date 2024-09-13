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
	const sort = req.query.sort;
	const count = Number(req.query.count);
	const sortOption = { createdAt: sort === "oldest" ? "asc" : "desc" };

	const products = await Product.find().sort(sortOption).limit(count); // Full scan

	res.send(products);
}));

app.get("/products/:id", asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);
	// console.log(id);
	if (product) {
		res.send(product);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send({message: "없습니다."});
	}
}));

// PUT 전체, PATCH 일부만
app.patch("/products/:id", asyncHandler((req, res) => {
	const id = Number(req.params.id);
	const product = mockProducts.find(product => product.id === id);
	if (product) {
		Object.keys(req.body).forEach(key => {
			product[key] = req.body[key];
		});
		res.send(product);
	}
	else {
		res.status(HttpStatus.NOT_FOUND).send({"message": "없습니다."});
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
