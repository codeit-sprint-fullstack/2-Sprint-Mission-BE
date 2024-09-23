import express from "express";
import { Prisma } from "@prisma/client";
import config from "./config.js";
//import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { assert } from "superstruct";
import { CreateProduct, PatchProduct } from "./structs.js";

const app = express();
//app.use(cors());
app.use(express.json());

const PORT = config.port || 3000;
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const asyncHandler = (handler) => {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientUnknownRequestError &&
        e.code === "P2025"
      ) {
        res.status(404).send({ message: NOT_FOUND_MESSAGE });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
};
const prisma = new PrismaClient();

app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const {
      page = 0,
      pageSize = 10,
      order = "oldest",
      keyword = ""
    } = req.query;
    const orderBy =
      order === "oldest"
        ? { createdAt: "asc" }
        : order === "newest"
        ? { createdAt: "desc" }
        : order === "favoritest"
        ? { favorite: "desc" }
        : {};
    const products = await prisma.product.findMany({
      orderBy,
      skip: parseInt(page) * parseInt(pageSize),
      take: parseInt(pageSize),
      where: {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } }
        ]
      }
    });
    res.send(products);
  })
);
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({ where: { id } });
    res.send(product);
  })
);
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({ data: req.body });
    res.status(201).send(product);
  })
);
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchProduct);
    const product = await prisma.product.update({
      where: { id },
      data: req.body
    });
    res.status(203).send(product);
  })
);
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);
app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행중입니다.`));
