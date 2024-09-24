import express from 'express';
import {
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticles
} from '../controllers/articleController.js';
import commentRoutes from './commentRoutes.js';

const router = express.Router();

router.post('/', createArticle); // 상품 등록
router.get('/:id', getArticleById); // 상품 상세 조회
router.patch('/:id', updateArticle); // 상품 수정
router.delete('/:id', deleteArticle); // 상품 삭제
router.get('/', getArticles); // 상품 목록 조회

router.use('/:articleId/comments', commentRoutes);

export default router;
