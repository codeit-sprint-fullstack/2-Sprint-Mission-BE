import express from "express";
import auth from "../middlewares/auth.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { assert } from "superstruct";
import prisma from "../config/prisma.js";



const commentController = express.Router();
//댓글 조회
commentController.get(
  "/",
  asyncHandler(async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.send(comments);
  })
);
commentController.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id },
    });
    res.send(comment);
  })
);

// 댓글 등록
commentController.post(
  "/",
  auth.verifyAccessToken, // 로그인한 사용자만 댓글 등록 가능
  asyncHandler(async (req, res) => {
    assert(req.body, CreateComment);
    
    const userId = req.user.userId; // 인증된 사용자 ID 가져오기
    const commentData = {
      ...req.body,
      userId, // 댓글 작성자 ID 추가
    };
    
    const comment = await prisma.comment.create({
      data: commentData,
    });
    res.status(201).send(comment);
  })
);

// 댓글 수정
commentController.patch(
  "/:id",
  auth.verifyAccessToken, // 로그인한 사용자만 댓글 수정 가능
  asyncHandler(async (req, res) => {
    assert(req.body, PatchComment);
    const { id } = req.params;

    // 댓글 소유자 확인
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id },
    });

    if (comment.userId !== req.user.userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: req.body,
    });
    res.send(updatedComment);
  })
);

// 댓글 삭제
commentController.delete(
  "/:id",
  auth.verifyAccessToken, // 로그인한 사용자만 댓글 삭제 가능
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 댓글 소유자 확인
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id },
    });

    if (comment.userId !== req.user.userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await prisma.comment.delete({ where: { id } });
    res.sendStatus(204);
  })
);

export default commentController;
