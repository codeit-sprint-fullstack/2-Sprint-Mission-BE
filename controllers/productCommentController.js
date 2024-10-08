import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../asyncHandler.js";
import { assert } from "superstruct";
import { CreateProductComment, UpdateProductComment } from "../structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//댓글 목록 조회 GET
export const getProductComments = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { cursor, limit = 10 } = req.query;

  const productComments = await prisma.productComment.findMany({
    where: { productId },
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
    productComments.length === parseInt(limit)
      ? productComments[productComments.length - 1].id
      : null;

  res.send({ productComments, nextCursor });
});

//댓글 등록 POST
export const createProductComment = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { content } = req.body;
  assert(req.body, CreateProductComment);

  const productComment = await prisma.productComment.create({
    data: {
      content: content,
      product: {
        connect: { id: productId },
      },
    },
  });

  res.status(201).send(productComment);
});

//댓글 수정 PATCH
export const updateProductComment = asyncHandler(async (req, res) => {
  assert(req.body, UpdateProductComment);

  const { id } = req.params;

  const productComment = await prisma.productComment.update({
    where: { id },
    data: req.body,
  });

  res.status(201).send(productComment);
});

//댓글 삭제 DELETE
export const deleteProductComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.productComment.delete({
    where: { id },
  });

  res.sendStatus(204);
});
