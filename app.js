import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  CreateProduct,
  CreateArticle,
  PatchProduct,
  PatchArticle,
  CreateComment,
  PatchComment,
} from "./structs.js";
import { assert } from "superstruct";

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

/*********** products ***********/

app.get(
  "/items",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = "recent", searchTerm } = req.query;
    let orderBy;
    switch (order) {
      case "favorite":
        orderBy = { favoriteCount: "desc" };
        break;
      case "recent":
      default:
        orderBy = { createdAt: "desc" };
    }
    const products = await prisma.product.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      include: {
        comments: {
          select: {
            content: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: searchTerm || " ",
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm || " ",
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.send(products);
  })
);

app.get(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(product);
  })
);

app.post(
  "/items",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).send(product);
  })
);

app.patch(
  "/items/:id",
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
  "/items/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/items/:id/comments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comments } = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(comments);
  })
);

/*********** article ***********/

app.get(
  "/article",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = "recent", search } = req.query;
    let orderBy;
    switch (order) {
      case "older":
        orderBy = { createdAt: "asc" };
        break;
      case "recent":
      default:
        orderBy = { createdAt: "desc" };
    }
    const articles = await prisma.article.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
      include: {
        comments: {
          select: {
            content: true,
          },
        },
      },
      where: {
        OR: [
          {
            title: {
              contains: search || " ", //title에 사용자가 입력한 검색어를 담고있는 변수가 포함된경우
              mode: "insensitive", //대소문자 구분없이 검색
            },
          },
          {
            content: {
              contains: search || " ", //content에 사용자가 입력한 검색어를 담고있는 변수가 포함된경우
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.send(articles);
  })
);

app.get(
  "/article/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(article);
  })
);

app.post(
  "/article",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateArticle);
    const article = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send(article);
  })
);

app.patch(
  "/article/:id",
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
  "/article/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/article/:id/comments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comments } = await prisma.article.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(comments);
  })
);

/*********** comment ***********/

app.get(
  "/comments",
  asyncHandler(async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.send(comments);
  })
);

app.get(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id },
    });
    res.send(comment);
  })
);

app.post(
  "/comments",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateComment);
    const comment = await prisma.comment.create({
      data: req.body,
    });
    res.status(201).send(comment);
  })
);

app.patch(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchComment);
    const { id } = req.params;
    const comment = await prisma.comment.update({
      where: { id },
      data: req.body,
    });
    res.send(comment);
  })
);

app.delete(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({ where: { id } });
    res.sendStatus(204);
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
