import express from 'express';
import asyncHandler from '../middleware/ayncHandler.js';
import { 
  getArticles, 
  getArticleById, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from '../controllers/articleController.js';

const router = express.Router();
// /articles
router.get('/', asyncHandler(getArticles));
router.get('/:id', asyncHandler(getArticleById));
router.post('/', asyncHandler(createArticle));
router.patch('/:id', asyncHandler(updateArticle));
router.delete('/:id', asyncHandler(deleteArticle));

export default router;