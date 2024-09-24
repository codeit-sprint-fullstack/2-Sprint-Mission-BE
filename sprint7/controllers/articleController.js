import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { CreateArticle, PatchArticle } from "../struct.js";
import { assert } from "superstruct";

const prisma = new PrismaClient();

export const getArticles = asyncHandler(async (req, res) => {
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
      comments: {
        select: {
          content: true,
        },
      },
    },
  });

  res.send(articles);
});

export const getArticleById = asyncHandler(async (req, res) => {
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
});

export const createArticle = asyncHandler(async (req, res) => {
  assert(req.body, CreateArticle);
  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(article);
});

export const updateArticle = asyncHandler(async (req, res) => {
  assert(req.body, PatchArticle);
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.send(article);
});

export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204); // 본문 없이 응답을 종료
});
