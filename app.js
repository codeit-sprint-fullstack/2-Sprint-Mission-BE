import express from "express";
import { Prisma } from "@prisma/client";
import config from "./config.js";
import cors from "cors";
import pkg from "@prisma/client"; // Default import
const { PrismaClient } = pkg; // PrismaClient 가져오기
import { assert } from "superstruct";
import {
  CreateProduct,
  PatchProduct,
  CreateArticle,
  PatchArticle,
  CreateProductComment,
  PatchProductCommnet,
  CreateArticleComment,
  PatchArticleComment
} from "./structs.js";
import { asyncHandler, checkAndConvertPageParams } from "./helper.js";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = config.port || 3000;
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const NOT_FOUND_USERID_MESSAGE = "User ID is required";

const prisma = new PrismaClient();
//************* USER*************/
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
  })
);
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        articles: true,
        products: true,
        articleComments: true,
        productComments: true
      }
    });
    res.send(user);
  })
);
//************************PRODUCTS********************************
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page, pageSize, order, keyword } = checkAndConvertPageParams(
      req.query
    );
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
      skip: page * pageSize,
      take: pageSize,
      where: keyword
        ? {
            OR: [
              { name: { contains: keyword, mode: "insensitive" } },
              { description: { contains: keyword, mode: "insensitive" } }
            ]
          }
        : undefined
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
    const { userId, ...productData } = req.body;
    assert(productData, CreateProduct);
    if (!userId) throw new Error(NOT_FOUND_USERID_MESSAGE);
    const product = await prisma.product.create({
      data: {
        ...productData,
        user: {
          connect: { id: userId }
        }
      }
    });
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
//************Article*********** */
app.get(
  "/articles",
  asyncHandler(async (req, res) => {
    const { page, pageSize, order, keyword } = checkAndConvertPageParams(
      req.query
    );
    const orderBy =
      order === "recent" ? { createdAt: "desc" } : { createdAt: "asc" };
    const article = await prisma.article.findMany({
      orderBy,
      skip: page * pageSize,
      take: pageSize,
      where: keyword
        ? {
            OR: [
              { title: { contains: keyword } },
              { content: { contains: keyword } }
            ]
          }
        : undefined
    });
    res.send(article);
  })
);
app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id }
    });
    res.send(article);
  })
);
app.post(
  "/articles",
  asyncHandler(async (req, res) => {
    const { userId, ...articleData } = req.body;
    assert(articleData, CreateArticle);
    if (!userId) throw new Error(NOT_FOUND_USERID_MESSAGE);
    const article = await prisma.article.create({
      data: {
        ...articleData,
        user: {
          connect: { id: userId }
        }
      }
    });
    res.status(201).send(article);
  })
);
app.patch(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchArticle);
    const article = await prisma.article.update({
      where: { id },
      data: req.body
    });
    res.status(203).send(article);
  })
);
app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);
//************************ProductConmment******************/
app.get(
  "/product-comments",
  asyncHandler(async (req, res) => {
    const { cursor, limit = 10 } = req.query;
    const query = {
      orderBy: {
        createdAt: "desc"
      },
      take: parseInt(limit)
    };
    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }
    const comments = await prisma.productComment.findMany(query);
    res.send(comments);
  })
);
app.get(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.productComment.findUniqueOrThrow({
      where: { id }
    });
    res.send(comment);
  })
);
app.patch(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchProductCommnet);
    const comment = await prisma.productComment.update({
      where: { id },
      data: req.body
    });
    res.send(comment);
  })
);
app.post(
  "/product-comments",
  asyncHandler(async (req, res) => {
    const { userId, productId, ...commentFields } = req.body;
    assert(commentFields, CreateProductComment);
    const comment = await prisma.productComment.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        ...commentFields
      }
    });
    res.status(203).send(comment);
  })
);
app.delete(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.productComment.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);
//**************************ArticleComment*****************************************/
app.get(
  "/article-comments",
  asyncHandler(async (req, res) => {
    const { limit = 10, cursor } = req.query;
    const query = {
      orderBy: { createdAt: "desc" },
      take: parseInt(limit)
    };
    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }
    const comments = await prisma.articleComment.findMany(query);
    res.send(comments);
  })
);
app.get(
  "/article-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.articleComment.findUniqueOrThrow({
      where: { id }
    });
    res.send(comment);
  })
);
app.post(
  "/article-comments",
  asyncHandler(async (req, res) => {
    const { userId, articleId, ...commentFields } = req.body;
    assert(commentFields, CreateArticleComment);
    const comment = await prisma.articleComment.create({
      data: {
        user: { connect: { id: userId } },
        article: { connect: { id: articleId } },
        ...commentFields
      }
    });
    res.status(201).send(comment);
  })
);
app.patch(
  "/article-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchArticleComment);
    const comment = await prisma.articleComment.update({
      where: { id },
      data: req.body
    });
    res.status(203).send(comment);
  })
);
app.delete(
  "/article-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.articleComment.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);

app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행중입니다.`));
