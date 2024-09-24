import prisma from '../models/productCommentModel.js';
import { assert } from 'superstruct';
import { CreateProductComment, PatchProductComment } from '../structs.js';
import { handleError } from '../utils/handleError.js';

// 댓글 등록
export const createProductComment = async (req, res, next) => {
  try {
    assert(req.body, CreateProductComment);
    const { content } = req.body;
    const { productId } = req.params;

    const newComment = await prisma.productComment.create({
      data: {
        content,
        productId,
        ownerUserId: '김철수' // 임시 하드 코딩
      }
    });
    res.locals.data = newComment;
    res.status(201).json(newComment);
  } catch (err) {
    handleError(err, next);
  }
};

// 댓글 수정
export const updateProductComment = async (req, res, next) => {
  try {
    assert(req.body, PatchProductComment);
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await prisma.productComment.update({
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
export const deleteProductComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    await prisma.productComment.delete({
      where: { id: commentId }
    });

    res.sendStatus(204);
  } catch (err) {
    handleError(err, next);
  }
};

// 댓글 목록 조회
export const getProductComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { cursor } = req.query;

    const comments = await prisma.productComment.findMany({
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
