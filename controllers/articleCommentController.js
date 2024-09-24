import prisma from '../models/articleCommentModel.js';
import { assert } from 'superstruct';
import { CreateArticleComment, PatchArticleComment } from '../structs.js';
import { handleError } from '../utils/handleError.js';

// 댓글 등록
export const createArticleComment = async (req, res, next) => {
  try {
    assert(req.body, CreateArticleComment);
    const { content } = req.body;
    const { articleId } = req.params;

    const newComment = await prisma.articleComment.create({
      data: {
        content,
        articleId,
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
export const updateArticleComment = async (req, res, next) => {
  try {
    assert(req.body, PatchArticleComment);
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await prisma.articleComment.update({
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
export const deleteArticleComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    await prisma.articleComment.delete({
      where: { id: commentId }
    });

    res.sendStatus(204);
  } catch (err) {
    handleError(err, next);
  }
};

// 댓글 목록 조회
export const getArticleComments = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { cursor } = req.query;

    const comments = await prisma.articleComment.findMany({
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
