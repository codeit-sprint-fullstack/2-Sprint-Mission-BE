import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";
import {
  CreateProduct,
  PatchProduct,
  CreateArticle,
  PatchArticle,
  CreateProductComment,
  PatchProductComment,
  CreateArticleComment,
  PatchArticleComment,
} from "./structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// Products ----------------------------
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = "recent", search = "" } = req.query;
    let orderBy;
    switch (order) {
      case "old":
        orderBy = { createdAt: "asc" };
        break;
      case "recent":
      default:
        orderBy = { createdAt: "desc" };
    }

    const where = search
      ? {
          OR: ["name", "description"].map((field) => ({
            [field]: {
              contains: search,
              mode: "insensitive",
            },
          })),
        }
      : {};

    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(products);
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    });
    res.send(product);
  })
);

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).send(product);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.send(product);
  })
);

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

// Articles ------------------------------
app.get(
  "/articles",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = "recent", search = "" } = req.query;
    let orderBy;
    switch (order) {
      case "old":
        orderBy = { createdAt: "asc" };
        break;
      case "recent":
      default:
        orderBy = { createdAt: "desc" };
    }

    const where = search
      ? {
          OR: ["title", "content"].map((field) => ({
            [field]: {
              contains: search,
              mode: "insensitive",
            },
          })),
        }
      : {};

    const articles = await prisma.article.findMany({
      where,
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(articles);
  })
);

app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    });
    res.send(article);
  })
);

app.post(
  "/articles",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateArticle);
    const article = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send(article);
  })
);

app.patch(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchArticle);
    const { id } = req.params;
    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });
    res.send(article);
  })
);

app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

// ProductComments ----------------------
// 상품별 댓글 전체 조회 (by productId)
app.get(
  "/product-comments/:productId",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    const { productId } = req.params;

    const productComments = await prisma.productComment.findMany({
      where: { productId },
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(productComments);
  })
);

// 개별 댓글 조회
app.get(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const productComment = await prisma.productComment.findUniqueOrThrow({
      where: { id },
    });
    res.send(productComment);
  })
);

// 상품별 댓글 생성
app.post(
  "/product/:productId/comments",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProductComment);
    const { productId } = req.params;
    const productComment = await prisma.productComment.create({
      data: {
        ...req.body,
        product: {
          connect: { id: productId },
        },
      },
    });
    res.status(201).send(productComment);
  })
);

app.patch(
  "/product/comments/:commentId",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProductComment);
    const { id } = req.params;
    const productComment = await prisma.productComment.update({
      where: { id },
      data: req.body,
    });
    res.send(productComment);
  })
);

app.delete(
  "/product/comments/:commentId",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.productComment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

// ArticleComments ----------------------
// 상품별 댓글 전체 조회 (by articleId)
app.get(
  "/article/:articleId/comments",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    const { articleId } = req.params;

    const articleComments = await prisma.articleComment.findMany({
      where: { articleId },
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(articleComments);
  })
);

// 개별 댓글 조회
app.get(
  "/article/comments/:commentId",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const articleComment = await prisma.articleComment.findUniqueOrThrow({
      where: { id },
    });
    res.send(articleComment);
  })
);

// 상품별 댓글 생성
app.post(
  "/article/comments/:articleId",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateArticleComment);
    const { articleId } = req.params;
    const articleComment = await prisma.articleComment.create({
      data: {
        ...req.body,
        article: {
          connect: { id: articleId },
        },
      },
    });
    res.status(201).send(articleComment);
  })
);

app.patch(
  "/article/comments/:commentId",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchArticleComment);
    const { id } = req.params;
    const prodarticleCommentuct = await prisma.articleComment.update({
      where: { id },
      data: req.body,
    });
    res.send(articleComment);
  })
);

app.delete(
  "/article/comments/:commentId",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.articleComment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
