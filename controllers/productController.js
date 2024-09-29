import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../asyncHandler.js";
import { assert } from "superstruct";
import { CreateProduct, UpdateProduct } from "../structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//상품 상세 조회 GET:id
export const getProductById = asyncHandler(async (req, res) => {
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
});

//상품 목록 조회 GET
export const getProducts = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 10, order = "newest", search = "" } = req.query;

  let orderBy;
  switch (order) {
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const where = {
    OR: [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit),
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
  });

  res.send(products);
});

//상품 등록 POST
export const createProduct = asyncHandler(async (req, res) => {
  assert(req.body, CreateProduct);

  const product = await prisma.product.create({
    data: req.body,
  });

  res.status(201).send(product);
});

//상품 수정 PATCH
export const updateProduct = asyncHandler(async (req, res) => {
  assert(req.body, UpdateProduct);

  const { id } = req.params;

  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });

  res.status(201).send(product);
});

//상품 삭제 DELETE
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: { id },
  });

  res.sendStatus(204);
});
