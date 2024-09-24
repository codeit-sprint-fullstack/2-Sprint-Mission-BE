import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from 'cors';
import {
	CreateProduct,
	PatchProduct,
} from './structs.js';
import * as dotenv from 'dotenv';
import { assert } from "superstruct";

dotenv.config();
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

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

function asyncHandler(handler) {
	return (async function (req, res) {
		try {
			await handler(req, res);
		}
		catch (e) {
			console.log(e.name);
			console.log(e.message);
			if (e.name === 'StructError' || e instanceof Prisma.PrismaClientValidationError) {
				res.status(HttpStatus.BAD_REQUEST).send({ name: e.name, message: e.message });
			}
			else if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
				res.status(HttpStatus.NOT_FOUND).send({ name: e.name, message: e.message });
			}
			else {
				res.status(HttpStatus.SERVER_ERROR).send({ name: e.name, message: e.message });
			}
		}
	});
}

app.post("/products", asyncHandler(async (req, res) => {
	assert(req.body, CreateProduct);
	const product = await prisma.product.create({
		data: req.body
	});
	res.send(product);
}));

app.patch("/products/:id", asyncHandler(async (req, res) => {
	assert(req.body, PatchProduct);
	const { id } = req.params;
	const product = await prisma.product.update({
		where: { id },
		data: req.body,
	});
	res.send(product);
}));

app.get("/products", asyncHandler(async (req, res) => {
	const { offset = 0, limit = 10, sort = "recent", keyword = "" } = req.query;
	const query = keyword ? {
		OR: [{
				name: { contains: keyword }
			},
			{
				description: { contains: keyword }
			}]
		}
	: {};
	let orderBy;
	switch (orderBy) {
		case "favorite":
			orderBy = { favoriteCount: "desc" };
			break;
		case "oldest":
			orderBy = { createdAt: "asc" };
			break;
		case "recent":
		default:
			orderBy = { createdAt: "desc" };
	}
	const totalCount = await prisma.product.count({
		where: query,
	});
	const products = await prisma.product.findMany({
		where: query,
		orderBy,
		skip: parseInt(offset),
		take: parseInt(limit),
	});
	res.send({ list: products, totalCount });
}));

app.get("/products/:id", asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await prisma.product.findUniqueOrThrow({
		where: { id },
	});
	res.send(product);
}));

app.delete("/products/:id", asyncHandler(async (req, res) => {
const { id } = req.params;
	const product = await prisma.product.delete({
		where: { id },
	});
	res.status(HttpStatus.NO_CONTENT).send(product);
}));

app.listen(process.env.PORT || 3000, () => console.log("Server on"));
