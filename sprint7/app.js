import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
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

//Product
app.get("/products", async (req, res) => {
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
  });
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  res.send(product);
});

app.patch("/products/:id", async (req, res) => {
  assert(req.body, PatchProduct);
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.send(product);
});

app.post("/products", async (req, res) => {
  assert(req.body, CreateProduct);
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).send(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.sendStatus(204);
});

//Article
app.get("/articles", async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;
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
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.send(articles);
});

app.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUnique({
    where: { id },
  });
  res.send(article);
});

app.patch("/articles/:id", async (req, res) => {
  assert(req.body, PatchArticle);
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.send(article);
});

app.post("/articles", async (req, res) => {
  assert(req.body, CreateArticle);
  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(article);
});

app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204); // 본문 없이 응답을 종료
});

//ArticleComment
app.get("/articles/:articleId/comments", async (req, res) => {
  const { articleId } = req.params;
  const comments = await prisma.comment.findMany({
    where: { articleId },
  });
  res.send(comments);
});

app.get("/articles/:articleId/comments/:id", async (req, res) => {
  const { articleId, id } = req.params;
  const comment = await prisma.comment.findFirst({
    where: { articleId, id },
  });
  res.send(comment);
});

app.patch("/articles/:articleId/comments/:id", async (req, res) => {
  const { articleId, id } = req.params;
  const comment = await prisma.comment.update({
    where: { articleId, id },
    data: req.body,
  });
  res.send(comment);
});

app.post("/articles/:articleId/comments", async (req, res) => {
  const { articleId } = req.params;
  const comment = await prisma.comment.create({
    where: { articleId },
    data: req.body,
  });
  res.status(201).send(comment);
});

app.delete("/comments/:id", async (req, res) => {
  const { articleId, id } = req.params;
  await prisma.comment.delete({
    where: { articleId, id },
  });
  res.sendStatus(204);
});

app.listen(process.env.PORT || 3000, () => console.log("server started"));
