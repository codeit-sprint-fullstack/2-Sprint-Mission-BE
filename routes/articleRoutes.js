import express from 'express';
import {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticles
} from '../controllers/articleController.js';
import articleCommentRoutes from './articleCommentRoutes.js';

const router = express.Router();

router.post('/', createArticle); // 게시글 등록
router.get('/:id', getArticleById); // 게시글 상세 조회
router.patch('/:id', updateArticle); // 게시글 수정
router.delete('/:id', deleteArticle); // 게시글 삭제
router.get('/', getArticles); // 게시글 목록 조회

router.use('/:articleId/comments', articleCommentRoutes);

export default router;
