import { PrismaClient } from "@prisma/client";
import { assert } from "superstruct";
import { CreateArticle, PatchArticle } from "../structs.js";

const prisma = new PrismaClient();

export const getArticles = async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  } = req.query;
  const offset = (page - 1) * pageSize;
  const skip = parseInt(offset);
  const take = parseInt(pageSize);

  let orderConfig;
  switch (orderBy) {
    case "oldest":
      orderConfig = { createdAt: "asc" };
      break;
    case "recent":
    default:
      orderConfig = { createdAt: "desc" };
  }

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } },
      ],
    },
    orderBy: orderConfig,
    skip,
    take,
    include: {
      articleComments: true,
    },
  });

  const totalCount = await prisma.article.count({
    where: {
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } },
      ],
    },
  });

  res.send({
    list: articles,
    totalCount: totalCount,
  });
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUniqueOrThrow({
    where: { id },
    include: {
      articleComments: true,
    },
  });
  if (!article) {
    return res
      .status(404)
      .send({ message: "No article found with the given ID" });
  }
  res.send(article);
};

export const createArticle = async (req, res) => {
  assert(req.body, CreateArticle);

  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(article);
};

export const updateArticle = async (req, res) => {
  assert(req.body, PatchArticle);

  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.send(article);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204);
};
