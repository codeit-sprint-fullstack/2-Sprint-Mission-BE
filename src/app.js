import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  CreateProduct,
  CreateArticle,
  PatchProduct,
  PatchArticle,
  CreateComment,
  PatchComment,
} from "../structs.js";
import { assert } from "superstruct";
import cors from "cors";
import { asyncHandler } from "./middlewares/errorHandler.js";

import userController from "./controllers/userController.js";
import errorHandler from "./middlewares/errorHandler.js";
import commentController from "./controllers/commentController.js";
import productController from "./controllers/productController.js";
import articleController from "./controllers/articleController.js";
import { router } from "./middlewares/upload.js";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use("", userController);
app.use("/comments", commentController);
app.use("/products", productController);
app.use("/images", router);
app.use("/articles", articleController);
app.use(errorHandler);

/*********** article ***********/

// app.get(
//   "/article",
//   asyncHandler(async (req, res) => {
//     const { offset = 0, limit = 10, order = "recent", search } = req.query;
//     let orderBy;
//     switch (order) {
//       case "older":
//         orderBy = { createdAt: "asc" };
//         break;
//       case "recent":
//       default:
//         orderBy = { createdAt: "desc" };
//     }
//     const articles = await prisma.article.findMany({
//       skip: parseInt(offset),
//       take: parseInt(limit),
//       orderBy,
//       include: {
//         comments: {
//           select: {
//             content: true,
//           },
//         },
//       },
//       where: {
//         OR: [
//           {
//             title: {
//               contains: search || " ", //title에 사용자가 입력한 검색어를 담고있는 변수가 포함된경우
//               mode: "insensitive", //대소문자 구분없이 검색
//             },
//           },
//           {
//             content: {
//               contains: search || " ", //content에 사용자가 입력한 검색어를 담고있는 변수가 포함된경우
//               mode: "insensitive",
//             },
//           },
//         ],
//       },
//     });
//     res.send(articles);
//   })
// );

// app.get(
//   "/article/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const article = await prisma.article.findUniqueOrThrow({
//       where: { id },
//       include: {
//         comments: true,
//       },
//     });
//     res.send(article);
//   })
// );

// app.post(
//   "/article",
//   asyncHandler(async (req, res) => {
//     assert(req.body, CreateArticle);
//     const article = await prisma.article.create({
//       data: req.body,
//     });
//     res.status(201).send(article);
//   })
// );

// app.patch(
//   "/article/:id",
//   asyncHandler(async (req, res) => {
//     assert(req.body, PatchArticle);
//     const { id } = req.params;
//     const article = await prisma.article.update({
//       where: { id },
//       data: req.body,
//     });
//     res.send(article);
//   })
// );

// app.delete(
//   "/article/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     await prisma.article.delete({
//       where: { id },
//     });
//     res.sendStatus(204);
//   })
// );

// app.get(
//   "/article/:id/comments",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { comments } = await prisma.article.findUniqueOrThrow({
//       where: { id },
//       include: {
//         comments: true,
//       },
//     });
//     res.send(comments);
//   })
// );

/*********** comment ***********/

// app.get(
//   "/comments",
//   asyncHandler(async (req, res) => {
//     const comments = await prisma.comment.findMany();
//     res.send(comments);
//   })
// );

// app.get(
//   "/comments/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const comment = await prisma.comment.findUniqueOrThrow({
//       where: { id },
//     });
//     res.send(comment);
//   })
// );

// app.post(
//   "/comments",
//   asyncHandler(async (req, res) => {
//     assert(req.body, CreateComment);
//     const comment = await prisma.comment.create({
//       data: req.body,
//     });
//     res.status(201).send(comment);
//   })
// );

// app.patch(
//   "/comments/:id",
//   asyncHandler(async (req, res) => {
//     assert(req.body, PatchComment);
//     const { id } = req.params;
//     const comment = await prisma.comment.update({
//       where: { id },
//       data: req.body,
//     });
//     res.send(comment);
//   })
// );

// app.delete(
//   "/comments/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     await prisma.comment.delete({ where: { id } });
//     res.sendStatus(204);
//   })
// );

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
