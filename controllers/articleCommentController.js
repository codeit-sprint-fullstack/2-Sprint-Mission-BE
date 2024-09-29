import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../asyncHandler.js";
import { assert } from "superstruct";
import { CreateArticleComment, UpdateArticleComment } from "../structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//댓글 목록 조회 GET
export const getArticleComments = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { cursor, limit = 10 } = req.query;

  const articleComments = await prisma.articleComment.findMany({
    where: { articleId },
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    take: parseInt(limit),
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const nextCursor =
    articleComments.length === parseInt(limit)
      ? articleComments[articleComments.length - 1].id
      : null;

  res.send({ articleComments, nextCursor });
});

//댓글 등록 POST
export const createArticleComment = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { content } = req.body;
  assert(req.body, CreateArticleComment);

  const articleComment = await prisma.articleComment.create({
    data: {
      content: content,
      article: {
        connect: { id: articleId },
      },
    },
  });

  res.status(201).send(articleComment);
});

//댓글 수정 PATCH
export const updateArticleComment = asyncHandler(async (req, res) => {
  assert(req.body, UpdateArticleComment);

  const { id } = req.params;

  const articleComment = await prisma.articleComment.update({
    where: { id },
    data: req.body,
  });

  res.status(201).send(articleComment);
});

//댓글 삭제 DELETE
export const deleteArticleComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.articleComment.delete({
    where: { id },
  });

  res.sendStatus(204);
});
