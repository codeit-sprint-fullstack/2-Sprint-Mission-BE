import { PrismaClient, Prisma } from "@prisma/client";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { CreateCommnet, PatchCommnet } from "../struct.js";
import { assert } from "superstruct";

const prisma = new PrismaClient();

/****Article***/

export const getArticleComments = asyncHandler(async (req, res) => {
  const { limit = 5, cursor } = req.query;
  const { articleId } = req.params;

  const queryOption = {
    where: { articleId },
    take: parseInt(limit),
    orderBy: {
      createdAt: "asc",
    },
  };
  if (cursor) {
    queryOption.where.createdAt = {
      gte: new Date(cursor), // cursor로 들어온 createdAt 이후의 데이터를 가져오기
    };
    queryOption.skip = 1;
  }
  const comments = await prisma.articleComment.findMany(queryOption);
  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].createdAt : null;
  res.send({ comments, nextCursor });
});

export const getArticleComment = asyncHandler(async (req, res) => {
  const { articleId, id } = req.params;
  const comment = await prisma.articleComment.findFirst({
    where: { articleId, id },
  });
  res.send(comment);
});

export const createArticleComment = asyncHandler(async (req, res) => {
  assert(req.body, CreateCommnet);
  const { articleId } = req.params;
  const comment = await prisma.articleComment.create({
    data: { ...req.body, articleId },
  });
  res.status(201).send(comment);
});

export const updateArticleComment = asyncHandler(async (req, res) => {
  assert(req.body, PatchCommnet);
  const { articleId, id } = req.params;
  const comment = await prisma.articleComment.update({
    where: { articleId, id },
    data: req.body,
  });
  res.send(comment);
});

export const deleteArticleComment = asyncHandler(async (req, res) => {
  const { articleId, id } = req.params;
  await prisma.articleComment.delete({
    where: { articleId, id },
  });
  res.sendStatus(204);
});

/****Product***/

export const getProductComments = asyncHandler(async (req, res) => {
  const { limit = 5, cursor } = req.query;
  const { productId } = req.params;

  const queryOption = {
    where: { productId },
    take: parseInt(limit),
    orderBy: { createdAt: "asc" },
  };
  if (cursor) {
    queryOption.where.createdAt = {
      gte: new Date(cursor),
    };
    queryOption.skip = 1;
  }

  const comments = await prisma.productComment.findMany(queryOption);
  const nextCursor =
    comments.length > 0 ? comments[comments.length - 1].createdAt : null;
  res.send({ comments, nextCursor });
});

export const getProductComment = asyncHandler(async (req, res) => {
  const { productId, id } = req.params;
  const comment = await prisma.productComment.findFirst({
    where: { productId, id },
  });
  res.send(comment);
});

export const createProductComment = asyncHandler(async (req, res) => {
  assert(req.body, CreateCommnet);
  const { productId } = req.params;
  const comment = await prisma.productComment.create({
    data: { ...req.body, productId },
  });
  res.status(201).send(comment);
});

export const updateProductComment = asyncHandler(async (req, res) => {
  assert(req.body, PatchCommnet);
  const { productId, id } = req.params;
  const comment = await prisma.productComment.update({
    where: { productId, id },
    data: req.body,
  });
  res.send(comment);
});

export const deleteProductComment = asyncHandler(async (req, res) => {
  const { productId, id } = req.params;
  await prisma.productComment.delete({
    where: { productId, id },
  });
  res.sendStatus(204);
});
