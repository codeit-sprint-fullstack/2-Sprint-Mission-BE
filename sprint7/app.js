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
  CreateCommnet,
  PatchCommnet,
} from "./struct.js";

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

/**********Product***********/
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, order = "newest", search = "" } = req.query;
    const offset = (page - 1) * limit;
    let orderBy =
      order === "oldest" ? { createdAt: "asc" } : { createdAt: "desc" };
    const products = await prisma.product.findMany({
      where: {
        name: { contains: search, mode: "insensitive" },
      },
      orderBy,
      take: parseInt(limit),
      skip: parseInt(offset),
      include: {
        comments: {
          select: {
            content: true,
          },
        },
      },
    });
    res.send(products);
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        comments: {
          select: {
            content: true,
          },
        },
      },
    });
    res.send(product);
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

/***********Article***********/
app.get(
  "/articles",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, order = "newest", search = "" } = req.query;
    const offset = (page - 1) * limit;

    let orderBy =
      order === "oldest" ? { createdAt: "asc" } : { createdAt: "desc" };

    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy,
      skip: Number(offset),
      take: Number(limit),
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        // updatedAt은 선택하지 않음
        comments: {
          select: {
            content: true,
          },
        },
      },
    });

    res.send(articles);
  })
);

app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        comments: {
          select: {
            content: true,
          },
        },
      },
    });
    res.send(article);
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

app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204); // 본문 없이 응답을 종료
  })
);

/**********ArticleComment***********/
app.get(
  "/articles/:articleId/comments",
  asyncHandler(async (req, res) => {
    const { limit = 5, cursor } = req.query;
    const { articleId } = req.params;
    const comments = await prisma.articleComment.findMany({
      where: { articleId },
      take: parseInt(limit),
      cursor: {
        id: cursor,
      },
      orderBy: { createdAt: "asc" },
    });
    res.send(comments);
  })
);

app.get(
  "/articles/:articleId/comments/:id",
  asyncHandler(async (req, res) => {
    const { articleId, id } = req.params;
    const comment = await prisma.articleComment.findFirst({
      where: { articleId, id },
    });
    res.send(comment);
  })
);

app.patch(
  "/articles/:articleId/comments/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchCommnet);
    const { articleId, id } = req.params;
    const comment = await prisma.articleComment.update({
      where: { articleId, id },
      data: req.body,
    });
    res.send(comment);
  })
);

app.post(
  "/articles/:articleId/comments",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateCommnet);
    const { articleId } = req.params;
    const comment = await prisma.articleComment.create({
      data: { ...req.body, articleId },
    });
    res.status(201).send(comment);
  })
);

app.delete(
  "/articles/:articleId/comments/:id",
  asyncHandler(async (req, res) => {
    const { articleId, id } = req.params;
    await prisma.articleComment.delete({
      where: { articleId, id },
    });
    res.sendStatus(204);
  })
);

/**********ProductComment***********/
app.get(
  "/products/:productId/comments",
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const comments = await prisma.productComment.findMany({
      where: { productId },
      orderBy: { createdAt: "asc" },
    });
    res.send(comments);
  })
);

app.get(
  "/products/:productId/comments/:id",
  asyncHandler(async (req, res) => {
    const { productId, id } = req.params;
    const comment = await prisma.productComment.findFirst({
      where: { productId, id },
    });
    res.send(comment);
  })
);

app.patch(
  "/products/:productId/comments/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchCommnet);
    const { productId, id } = req.params;
    const comment = await prisma.productComment.update({
      where: { productId, id },
      data: req.body,
    });
    res.send(comment);
  })
);

app.post(
  "/products/:productId/comments",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateCommnet);
    const { productId } = req.params;
    const comment = await prisma.productComment.create({
      data: { ...req.body, productId },
    });
    res.status(201).send(comment);
  })
);

app.delete(
  "/products/:productId/comments/:id",
  asyncHandler(async (req, res) => {
    const { productId, id } = req.params;
    await prisma.productComment.delete({
      where: { productId, id },
    });
    res.sendStatus(204);
  })
);

app.listen(process.env.PORT || 3000, () => console.log("server started"));
