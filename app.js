import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";
import {
  CreateProduct,
  PatchProduct,
  CreateArticle,
  PatchArticle,
} from "./structs.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://react-sprint.netlify.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

function asyncHandler(handler) {
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
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// product
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).send(product);
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    });

    res.send(product);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.send(product);
  })
);

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sort = "recent", search = "" } = req.query;
    const skip = (page - 1) * limit;
    const sortOption = { createdAt: sort === "recent" ? "desc" : "asc" };

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: sortOption,
      skip: skip,
      take: parseInt(limit),
    });

    res.send(products);
  })
);

// article
app.post(
  "/articles",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateArticle);
    const article = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send(article);
  })
);

app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    });

    res.send(article);
  })
);

app.patch(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchArticle);
    const { id } = req.params;
    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });
    res.send(article);
  })
);

app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/articles",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sort = "recent", search = "" } = req.query;
    const skip = (page - 1) * limit;
    const sortOption = { createdAt: sort === "recent" ? "desc" : "asc" };

    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: sortOption,
      skip: skip,
      take: parseInt(limit),
    });

    res.send(articles);
  })
);

// ProductComments
app.post(
  "/productComments",
  asyncHandler(async (req, res) => {
    const { content, productId } = req.body;
    const comment = await prisma.productComment.create({
      data: {
        content,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
    res.status(201).send(comment);
  })
);

app.patch(
  "/productComments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.productComment.update({
      where: { id },
      data: req.body,
    });
    res.send(comment);
  })
);

app.delete(
  "/productComments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.productComment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/productComments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.productComment.findUniqueOrThrow({
      where: { id },
    });

    res.send(comment);
  })
);

// ArticleComments
app.get(
  "/articleComments",
  asyncHandler(async (req, res) => {
    const { cursor, take = 10 } = req.query;
    const takeNumber = parseInt(take, 10);
    const comment = await prisma.articleComment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: takeNumber,
    });
    if (cursor) {
      queryOptions.cursor = {
        id: Number(cursor),
      };
      queryOptions.skip = 1;
    }
    res.send(comment);
  })
);

app.post(
  "/articleComments",
  asyncHandler(async (req, res) => {
    const { content, articleId } = req.body;
    const comment = await prisma.articleComment.create({
      data: {
        content,
        article: {
          connect: {
            id: articleId,
          },
        },
      },
    });
    res.status(201).send(comment);
  })
);

app.patch(
  "/articleComments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.articleComment.update({
      where: { id },
      data: req.body,
    });
    res.send(comment);
  })
);

app.delete(
  "/articleComments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.articleComment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

app.get(
  "/articleComments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.articleComment.findUniqueOrThrow({
      where: { id },
    });

    res.send(comment);
  })
);

app.get(
  "/articleComments",
  asyncHandler(async (req, res) => {
    const { cursor, take = 10 } = req.query;
    const takeNumber = parseInt(take, 10);
    const comment = await prisma.articleComment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: takeNumber,
    });
    if (cursor) {
      queryOptions.cursor = {
        id: Number(cursor),
      };
      queryOptions.skip = 1;
    }
    res.send(comment);
  })
);

app.listen(process.env.PORT || 5000, () => console.log("server start"));
