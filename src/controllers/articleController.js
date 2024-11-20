import express from "express";
import auth from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { assert } from "superstruct";
import prisma from "../config/prisma.js";

const articleController = express.Router();

articleController.get(
  "/",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = "recent", search } = req.query;
    let orderBy;
    switch (order) {
      case "older":
        orderBy = { createdAt: "asc" };
        break;
      case "recent":
      default:
        orderBy = { createdAt: "desc" };
    }
    const articles = await prisma.article.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
      include: {
        comments: {
          select: {
            content: true,
          },
        },
      },
      where: {
        OR: [
          {
            title: {
              contains: search || " ", //title에 사용자가 입력한 검색어를 담고있는 변수가 포함된경우
              mode: "insensitive", //대소문자 구분없이 검색
            },
          },
          {
            content: {
              contains: search || " ", //content에 사용자가 입력한 검색어를 담고있는 변수가 포함된경우
              mode: "insensitive",
            },
          },
        ],
      },
    });
    res.send(articles);
  })
);

articleController.get(
  "/:id",
  auth.verifyAccessToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(article);
  })
);

// 게시글 등록
articleController.post(
  "/",
  auth.verifyAccessToken, // 로그인한 사용자만 게시글 등록 가능
  asyncHandler(async (req, res) => {
    assert(req.body, CreateArticle);
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기

    const articleData = {
      ...req.body,
      userId, // 게시글 작성자 ID 추가
    };

    const article = await prisma.article.create({
      data: articleData,
    });
    res.status(201).send(article);
  })
);

// 게시글 수정
articleController.patch(
  "/:id",
  auth.verifyAccessToken, // 로그인한 사용자만 게시글 수정 가능
  asyncHandler(async (req, res) => {
    assert(req.body, PatchArticle);
    const { id } = req.params;

    // 게시글 소유자 확인
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    });

    if (article.userId !== req.user.userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: req.body,
    });
    res.send(updatedArticle);
  })
);

// 게시글 삭제
articleController.delete(
  "/:id",
  auth.verifyAccessToken, // 로그인한 사용자만 게시글 삭제 가능
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 게시글 소유자 확인
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    });

    if (article.userId !== req.user.userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

articleController.get(
  "/:id/comments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comments } = await prisma.article.findUniqueOrThrow({
      where: { id },
      include: {
        comments: true,
      },
    });
    res.send(comments);
  })
);

// 좋아요 추가
articleController.post(
  "/:id/favorite",
  auth.verifyAccessToken, // 로그인한 사용자만 좋아요 추가 가능
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기

    try {
      await prisma.favorite.create({
        data: {
          userId,
          articleId: Number(id),
        },
      });

      // 사용자 favoritesCount 증가
      await prisma.user.update({
        where: { id: userId },
        data: { favoritesCount: { increment: 1 } },
      });

      // 게시글 favoriteCount 증가
      await prisma.article.update({
        where: { id: Number(id) },
        data: { favoriteCount: { increment: 1 } },
      });

      res.status(201).json({ message: "좋아요가 추가되었습니다." });
    } catch (error) {
      console.error("좋아요 추가 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  })
);

// 좋아요 삭제
articleController.delete(
  "/:id/favorite",
  auth.verifyAccessToken, // 로그인한 사용자만 좋아요 삭제 가능
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기

    try {
      // 해당 사용자의 좋아요가 존재하는지 확인
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_articleId: {
            userId,
            articleId: Number(id),
          },
        },
      });

      // 좋아요가 존재하는 경우에만 삭제
      if (favorite) {
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

        // 게시글 favoriteCount 감소
        await prisma.article.update({
          where: { id: Number(id) },
          data: { favoriteCount: { decrement: 1 } },
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

export default articleController;
