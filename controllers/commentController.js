import prisma from '../models/commentModel.js';
import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../structs.js';
import { handleError } from '../utils/handleError.js';

// 댓글 등록
export const createComment = async (req, res, next) => {
  try {
    assert(req.body, CreateComment);
    const { content } = req.body;
    const { articleId } = req.params;

    const newComment = await prisma.comment.create({
      data: {
        content,
        articleId,
        ownerUserId: '맹구' // 임시 하드 코딩
      }
    });
    res.locals.data = newComment;
    res.status(201).json(newComment);
  } catch (err) {
    handleError(err, next);
  }
};

// 댓글 수정
export const updateComment = async (req, res, next) => {
  try {
    assert(req.body, PatchComment);
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content }
    });

    res.locals.data = comment;
    res.json(comment);
  } catch (err) {
    handleError(err, next);
  }
};

// 댓글 삭제
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    await prisma.comment.delete({
      where: { id: commentId }
    });

    res.sendStatus(204);
  } catch (err) {
    handleError(err, next);
  }
};

// 댓글 목록 조회
export const getComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { cursor } = req.query;

    const comments = await prisma.comment.findMany({
      where: { articleId },
      select: {
        id: true,
        content: true,
        createdAt: true
      },
      take: 10,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'desc' }
    });

    res.locals.data = comments;
    res.json(comments);
  } catch (err) {
    handleError(err, next);
  }
};
