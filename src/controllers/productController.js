import express from "express";
import auth from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { assert } from "superstruct";
import prisma from "../config/prisma.js";
import { CreateProduct, PatchProduct } from "../../structs.js"; // structs.js 파일의 경로를 정확히 입력하세요
import { upload } from "../middlewares/upload.js";

const productController = express.Router();

productController.get(
  "/",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = "recent", searchTerm } = req.query;
    let orderBy;
    switch (order) {
      case "favorite":
        orderBy = { favoriteCount: "desc" };
        break;
      case "recent":
      default:
        orderBy = { createdAt: "desc" };
    }
    const products = await prisma.product.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      include: {
        user: {
          select: {
            nickname: true,
          },
        },
        comments: {
          select: {
            content: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: searchTerm || " ",
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm || " ",
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.send(products);
  })
);

productController.get(
  "/:id",
  auth.verifyAccessToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기

    // 상품 조회
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        comments: true, // 댓글 포함
        favorites: {
          where: { userId }, // 해당 사용자의 좋아요 정보 포함
        },
        user: {
          // 상품 소유자의 정보 포함
          select: {
            nickname: true, // 소유자의 nickname만 선택
          },
        },
      },
    });

    // isLiked 필드 추가
    const isLiked = product.favorites.length > 0;

    res.send({
      ...product,
      isLiked, // 사용자 좋아요 상태
    });
  })
);

productController.post(
  "/",
  auth.verifyAccessToken,
  upload.single("image"), // 이미지 업로드 미들웨어
  async (req, res, next) => {
    const imagePath = req.file ? req.file.path : null;
    const userId = Number(req.user.userId);

    try {
      const data = {
        ...req.body,
        userId,
        images: imagePath ? [imagePath] : [], // 이미지 경로 포함
      };
      const product = await prisma.product.create({ data });
      res.status(201).send(product);
    } catch (error) {
      next(error);
    }
  }
);

productController.patch(
  "/:id",
  auth.verifyAccessToken, // 로그인한 사용자만 수정 가능
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const { id } = req.params;
    const userId = req.user.userId;

    // 상품 소유자 확인
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: Number(id) },
    });

    if (product.userId !== userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.send(updatedProduct);
  })
);

// 상품 삭제
productController.delete(
  "/:id",
  auth.verifyAccessToken, // 로그인한 사용자만 삭제 가능
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    // 상품 소유자 확인
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: Number(id) },
    });

    if (product.userId !== userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.sendStatus(204);
  })
);

productController.post(
  "/:id/favorite",
  auth.verifyAccessToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기

    try {
      await prisma.$transaction(async (prisma) => {
        // 좋아요 추가
        await prisma.favorite.create({
          data: {
            userId,
            productId: Number(id),
          },
        });

        // 사용자 favoritesCount 증가
        await prisma.user.update({
          where: { id: userId },
          data: { favoritesCount: { increment: 1 } },
        });

        // 제품 favoriteCount 증가
        await prisma.product.update({
          where: { id: Number(id) },
          data: { favoriteCount: { increment: 1 } },
        });
      });

      res.status(201).json({ message: "좋아요가 추가되었습니다." });
    } catch (error) {
      console.error("좋아요 추가 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  })
);

// 좋아요 취소 API
// 좋아요 취소 API
productController.delete(
  "/:id/favorite",
  auth.verifyAccessToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기

    try {
      // 해당 사용자의 좋아요가 존재하는지 확인
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_productId: {
            userId,
            productId: Number(id),
          },
        },
      });

      // 좋아요가 존재하는 경우에만 삭제
      if (favorite) {
        await prisma.$transaction(async (prisma) => {
          // 좋아요 삭제
          await prisma.favorite.delete({
            where: {
              id: favorite.id,
            },
          });

          // 사용자 favoritesCount 감소
          await prisma.user.update({
            where: { id: userId },
            data: { favoritesCount: { decrement: 1 } },
          });

          // 제품 favoriteCount 감소
          await prisma.product.update({
            where: { id: Number(id) },
            data: { favoriteCount: { decrement: 1 } },
          });
        });

        res.status(204).send(); // 성공적으로 삭제되면 No Content 응답
      } else {
        // 좋아요가 없는 경우
        res.status(404).json({ message: "좋아요가 존재하지 않습니다." });
      }
    } catch (error) {
      console.error("좋아요 취소 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  })
);

productController.get(
  "/:id/comments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comments } = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(comments);
  })
);

export default productController;
