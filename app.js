import express from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import {
  ValidationError,
  NotFoundError,
  InternalServerError,
} from "./error.js";
import Product from "./models/Products.js";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//에러 처리
function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      if (!(e instanceof ValidationError) && !(e instanceof NotFoundError)) {
        // 400 404 아닌 경우 500으로 취급
        e = new InternalServerError(e.message);
      }
      next(e);
    }
  };
}

// 전역 에러 핸들러

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

//상품 등록 API (post)

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const { name, description, price, tags } = req.body;
    if (!name || !description || !price || !tags) {
      throw new ValidationError("모든 필드를 입력해주세요.");
    }

    const product = await prisma.product.create({
      data: { name, description, price, tags },
    });
    res.status(201).send(product); //성공 시 상품 등록하기
  })
);

//상품 상세 조회 API (get)

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundError("상품이 없습니다."); //찾는 상품 없을 때
    }
    res.status(200).send(product); // 잘 찾았을 떄
  })
);

//상품 수정 API (PATCH)

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, tags } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, tags, updatedAt: new Date() },
    });

    if (!updatedProduct) {
      throw new NotFoundError("상품을 찾을 수 없습니다.");
    }

    res.status(200).send(updatedProduct);
  })
);

//상품 삭제 API

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id },
    });
    if (!product) {
      throw new NotFoundError("상품이 없습니다.");
    }
    res.status(200).send({ message: "상품이 삭제되었습니다.", product });
  })
);

//상품 목록 조회 API

app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sort = "recent", search } = req.query;

    //정렬
    const sortOption =
      sort === "recent" ? { createdAt: "desc" } : { createdAt: "asc" }; //-1은 내림차순 정렬(시간은 큰 값 -> 작은 값)

    // 페이지네이션
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const searchCondition = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    // 상품 목록 조회
    const products = await prisma.product.findMany({
      where: searchCondition,
      skip: offset,
      take: parseInt(limit),
      orderBy: sortOption,
    });

    // 총 상품 개수 조회
    const totalProducts = await prisma.product.count({
      where: searchCondition,
    });

    res.status(200).send({
      totalProducts,
      page: parseInt(page),
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      products,
    });
  })
);

//게시글
app.post(
  "/articles",
  asyncHandler(async (req, res) => {
    //등록
    const { title, content } = req.body;
    if (!title || !content) {
      throw new ValidationError("모든 필드 입력해주세요");
    }
    const article = await prisma.article.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).send(article);
  })
);

app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    //조회
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundError("게시글이 없습니다.");
    }

    res.status(200).send(article);
  })
);

app.patch(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    //수정
    const { title, content } = req.body;
    const { id } = req.params;

    const updateArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    if (!updateArticle) {
      throw new NotFoundError("게시글을 찾을 수 없습니다.");
    }

    res.status(200).send(updateArticle);
  })
);

app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.delete({
      where: { id },
    });

    res.status(200).send({ message: "게시글이 삭제되었습니다.", article });
  })
);

//댓글
app.post(
  //등록
  "/articles/:articleId/comments",
  asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { articleId } = req.params;

    if (!content) {
      throw new ValidationError("댓글을 입력해주세요.");
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
      },
    });

    res.status(201).send(comment);
  })
);

// 수정
app.patch(
  "/articles/:articleId/comments/:id",
  asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    if (!updatedComment) {
      throw new NotFoundError("댓글을 찾을 수 없습니다.");
    }

    res.status(200).send(updatedComment);
  })
);

// 삭제
app.delete(
  "/articles/:articleId/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.delete({
      where: { id },
    });

    res.status(200).send({ message: "댓글이 삭제되었습니다.", comment });
  })
);

// 조회
app.get(
  "/articles/:articleId/comments",
  asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const comment = await prisma.comment.findMany({
      where: { articleId },
    });

    res.status(200).send(comment);
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started")); //서버 시작
