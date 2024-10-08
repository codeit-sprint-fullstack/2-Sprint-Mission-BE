import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../asyncHandler.js";
import { assert } from "superstruct";
import { CreateArticle, UpdateArticle } from "../structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//게시글 상세 조회 GET:id
export const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      comments: {
        select: {
          content: true,
        },
      },
    },
  });

  res.send(article);
});

//게시물 목록 조회 GET
export const getArticles = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "recent", search = "" } = req.query;

  let orderBy;
  switch (order) {
    case "recent":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const where = {
    OR: [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  const articles = await prisma.article.findMany({
    where,
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  res.send(articles);
});

//게시물 등록 POST
export const createArticle = asyncHandler(async (req, res) => {
  assert(req.body, CreateArticle);

  const article = await prisma.article.create({
    data: req.body,
  });

  res.status(201).send(article);
});

//게시물 수정 PATCH
export const updateArticle = asyncHandler(async (req, res) => {
  assert(req.body, UpdateArticle);

  const { id } = req.params;

  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });

  res.status(201).send(article);
});

//게시물 삭제 DELETE
export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.article.delete({
    where: { id },
  });

  res.sendStatus(204);
});
