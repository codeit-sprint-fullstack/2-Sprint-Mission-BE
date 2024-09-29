import { PrismaClient } from "@prisma/client";
import { assert } from "superstruct";
import { CreateProduct, PatchProduct } from "../structs.js";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
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
    case "favorite":
      orderConfig = { favoriteCount: "desc" };
      break;
    case "recent":
    default:
      orderConfig = { createdAt: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: keyword, mode: "insensitive" } },
        { description: { contains: keyword, mode: "insensitive" } },
      ],
    },
    orderBy: orderConfig,
    skip,
    take,
    include: {
      productComments: true,
    },
  });

  const totalCount = await prisma.product.count({
    where: {
      OR: [
        { name: { contains: keyword, mode: "insensitive" } },
        { description: { contains: keyword, mode: "insensitive" } },
      ],
    },
  });

  res.send({
    list: products,
    totalCount: totalCount,
  });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
    include: {
      productComments: true,
    },
  });
  if (!product) {
    return res
      .status(404)
      .send({ message: "No product found with the given ID" });
  }
  res.send(product);
};

export const createProduct = async (req, res) => {
  assert(req.body, CreateProduct);

  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).send(product);
};

export const updateProduct = async (req, res) => {
  assert(req.body, PatchProduct);

  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.send(product);
};

export const deletProduct = async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id },
  });
  res.sendStatus(204);
};
