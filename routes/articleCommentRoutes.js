import express from 'express';
import {
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,
  getArticleComments
} from '../controllers/articleCommentController.js';

const router = express.Router({ mergeParams: true });

router.post('/', createArticleComment); // 댓글 등록
router.patch('/:commentId', updateArticleComment); // 댓글 수정
router.delete('/:commentId', deleteArticleComment); // 댓글 삭제
router.get('/', getArticleComments); // 댓글 목록

export default router;
