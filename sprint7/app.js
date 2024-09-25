import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from 'cors';
import {
	CreateArticle,
	CreateArticleComment,
	CreateProduct,
	CreateProductComment,
	CreateUser,
	PatchArticle,
	PatchProduct,
	PatchUser,
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

/////////////////////////////////////////////////////
// Users
/////////////////////////////////////////////////////

app.post("/users", asyncHandler(async (req, res) => {
	assert(req.body, CreateUser);
	const user = await prisma.user.create({
		data: req.body,
	});
	res.send(user);
}));

app.patch("/users/:id", asyncHandler(async (req, res) => {
	assert(req.body, PatchUser);
	const { id } = req.params;
	const user = await prisma.user.update({
		where: { id },
		data: req.body,
	});
	res.send(user);
}));

app.get("/users", asyncHandler(async (req, res) => {
	const { offset = 0, limit = 10, sort = "recent", keyword = "" } = req.query;
	const query = keyword ? {
		OR: [{
				email: { contains: keyword }
			},
			{
				nickname: { contains: keyword }
			}]
		}
	: {};
	let orderBy;
	switch (orderBy) {
		case "oldest":
			orderBy = { createdAt: "asc" };
			break;
		case "recent":
		default:
			orderBy = { createdAt: "desc" };
	}
	const totalCount = await prisma.user.count({
		where: query,
	});
	const users = await prisma.user.findMany({
		where: query,
		orderBy,
		skip: parseInt(offset),
		take: parseInt(limit),
	});
	res.send({ list: users, totalCount });
}));

app.get("/users/:id", asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await prisma.user.findUniqueOrThrow({
		where: { id },
	});
	res.send(user);
}));

app.get("/users/:userId/productComments", asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const { cursor, limit = 10, sort = "recent" } = req.query;
	let orderBy;
	switch (sort) {
		case "oldest":
			orderBy = { updatedAt: "asc" };
			break;
		case "recent":
		default:
			orderBy = { updatedAt: "desc" };
	}
	const [cursorComment, ...productComments] = await prisma.productComment.findMany({
		orderBy,
		where: {
			commenterId: userId,
		},
		cursor: cursor ? {
			id: cursor,
		}: undefined,
		take: parseInt(limit) + 1,
		select: {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
		},
	});
	res.send(productComments);
}));

app.get("/users/:userId/articleComments", asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const { cursor, limit = 10, sort = "recent" } = req.query;
	let orderBy;
	switch (sort) {
		case "oldest":
			orderBy = { updatedAt: "asc" };
			break;
		case "recent":
		default:
			orderBy = { updatedAt: "desc" };
	}
	const [cursorComment, ...articleComments] = await prisma.articleComment.findMany({
		orderBy,
		where: {
			commenterId: userId,
		},
		cursor: cursor ? {
			id: cursor,
		} : undefined,
		take: parseInt(limit) + 1,
		select: {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
		},
	});
	res.send(articleComments);
}));

app.delete("/users/:id", asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await prisma.user.delete({
		where: { id },
	});
	res.status(HttpStatus.NO_CONTENT).send(user);
}));

/////////////////////////////////////////////////////
// Products
/////////////////////////////////////////////////////

app.post("/products", asyncHandler(async (req, res) => {
	assert(req.body, CreateProduct);
	const product = await prisma.product.create({
		data: req.body,
	});
	res.send(product);
}));

app.post("/products/:id/comment", asyncHandler(async (req, res) => {
	assert(req.body, CreateProductComment);
	const { id: productId } = req.params;
	const productComment = await prisma.productComment.create({
		data: {
			...req.body,
			productId,
		},
		select: {
			id: true,
			content: true,
			commenter: {
				select: {
					nickname: true,
				},
			},
			product: {
				select: {
					name: true,
					description: true,
					price: true,
					tags: true,
					images: true,
					favoriteCount: true,
					createdAt: true,
					updatedAt: true,
				}
			}
		},
	});
	res.send(productComment);
}));

app.patch("/products/:productId/comment/:commentId", asyncHandler(async (req, res) => {
	assert(req.body, CreateProductComment);
	const { productId, commentId } = req.params;
	const productComment = await prisma.productComment.update({
		where: { id: commentId },
		data: {
			...req.body,
			productId,
		},
		select: {
			id: true,
			content: true,
			commenter: {
				select: {
					nickname: true,
				},
			},
			// product: {
			// 	select: {
			// 		id: true,
			// 		name: true,
			// 		description: true,
			// 		price: true,
			// 		tags: true,
			// 		images: true,
			// 		favoriteCount: true,
			// 		createdAt: true,
			// 		updatedAt: true,
			// 	}
			// },
		},
	});
	res.send(productComment);
}));

app.delete("/products/:productId/comment/:commentId", asyncHandler(async (req, res) => {
	const { commentId } = req.params;
	const productComment = await prisma.productComment.delete({
		where: { id: commentId },
	});
	res.status(HttpStatus.NO_CONTENT).send(productComment);
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

/////////////////////////////////////////////////
// * Article
/////////////////////////////////////////////////

app.post("/articles", asyncHandler(async (req, res) => {
	assert(req.body, CreateArticle);
	const article = await prisma.article.create({
		data: req.body,
	});
	res.send(article);
}));

app.post("/articles/:id/comment", asyncHandler(async (req, res) => {
	assert(req.body, CreateArticleComment);
	const { id: articleId } = req.params;
	const articleComment = await prisma.articleComment.create({
		data: {
			...req.body,
			articleId,
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			commenter: {
				select: {
					nickname: true,
				},
			},
			article: {
				select: {
					id: true,
					author: {
						select: {
							nickname: true,
						},
					},
					title: true,
					content: true,
					createdAt: true,
					updatedAt: true,
				}
			}
		},
	});
	res.send(articleComment);
}));

app.patch("/articles/:articleId/comment/:commentId", asyncHandler(async (req, res) => {
	assert(req.body, CreateArticleComment);
	const { articleId, commentId } = req.params;
	const articleComment = await prisma.articleComment.update({
		where: { id: commentId },
		data: {
			...req.body,
			articleId,
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			commenter: {
				select: {
					nickname: true,
				},
			},
			// article: {
			// 	select: {
			// 		id: true,
			// 		author: {
			// 			select: {
			// 				nickname: true,
			// 			},
			// 		},
			// 		title: true,
			// 		content: true,
			// 		createdAt: true,
			// 		updatedAt: true,
			// 	}
			// },
		},
	});
	res.send(articleComment);
}));

app.delete("/articles/:articleId/comment/:commentId", asyncHandler(async (req, res) => {
	const { commentId } = req.params;
	const articleComment = await prisma.articleComment.delete({
		where: { id: commentId },
	});
	res.status(HttpStatus.NO_CONTENT).send(articleComment);
}));

app.patch("/articles/:id", asyncHandler(async (req, res) => {
	assert(req.body, PatchArticle);
	const { id } = req.params;
	const article = await prisma.article.update({
		where: { id },
		data: req.body,
	});
	res.send(article);
}));

app.get("/articles", asyncHandler(async (req, res) => {
	const { offset = 0, limit = 12, sort = "recent", keyword = "" } = req.query;
	const query = keyword ? {
		OR: [{
				title: { contains: keyword }
			},
			{
				content: { contains: keyword }
			}]
		}
	: {};
	let orderBy;
	switch (orderBy) {
		case "oldest":
			orderBy = { createdAt: "asc" };
			break;
		case "recent":
		default:
			orderBy = { createdAt: "desc" };
	}
	const totalCount = await prisma.article.count({
		where: query,
	});
	const articles = await prisma.article.findMany({
		where: query,
		orderBy,
		skip: parseInt(offset),
		take: parseInt(limit),
	});
	res.send({ list: articles, totalCount });
}));

app.get("/articles/:id", asyncHandler(async (req, res) => {
	const { id } = req.params;
	const article = await prisma.article.findUniqueOrThrow({
		where: { id },
		select: {
			id: true,
			author: {
				select: {
					nickname: true,
				}
			},
			title: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			articleComments: {
				orderBy: { createdAt: "desc" },
				select: {
					content: true,
					commenter: {
						select: {
							nickname: true,
						}
					},
					createdAt: true,
					updatedAt: true,
				}
			}
		}
	});
	res.send(article);
}));

app.delete("/articles/:id", asyncHandler(async (req, res) => {
const { id } = req.params;
	const article = await prisma.article.delete({
		where: { id },
	});
	res.status(HttpStatus.NO_CONTENT).send(article);
}));



app.listen(process.env.PORT || 3000, () => console.log("Server on"));
