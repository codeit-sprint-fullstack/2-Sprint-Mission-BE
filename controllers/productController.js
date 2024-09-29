import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../asyncHandler.js";
// import { assert } from "superstruct";
// import { CreateProduct, PatchProduct } from "./structs.js";

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
          userName: true,
          content: true,
        },
      },
    },
  });
  res.send(product);
});

//상품 목록 조회 GET
// app.get(
//   "/products",
//   asyncHandler(async (req, res) => {
//     const { offset = 0, limit = 10, order = "newest" } = req.query;
//     let orderBy;
//     switch (order) {
//       case "oldest":
//         orderBy = { createdAt: "asc" };
//         break;
//       case "newest":
//       default:
//         orderBy = { createdAt: "desc" };
//     }
//     const users = await prisma.user.findMany({
//       orderBy,
//       skip: parseInt(offset),
//       take: parseInt(limit),
//     });
//     res.send(users);
//   }),
// );

//상품등록 POST

//상품 수정 PATCH

//상품 삭제 DELETE
