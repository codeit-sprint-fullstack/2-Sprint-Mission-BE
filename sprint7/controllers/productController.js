import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { CreateProduct, PatchProduct } from "../struct.js";
import { assert } from "superstruct";

const prisma = new PrismaClient();

export const getProducts = asyncHandler(async (req, res) => {
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

export const createProduct = asyncHandler(async (req, res) => {
  assert(req.body, CreateProduct);
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).send(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  assert(req.body, PatchProduct);
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.send(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.sendStatus(204);
});
