import express from 'express';
import asyncHandler from '../middleware/ayncHandler.js';
import { 
  createArticleComment, 
  deleteArticleComment, 
  getCommentsByArticleId, 
  updateArticleComment
} from '../controllers/articleCommentController.js';

const router = express.Router();
// /articles
router.get('/:articleId/comments', asyncHandler(getCommentsByArticleId));
router.post('/:articleId/comments', asyncHandler(createArticleComment));
router.patch('/comments/:commentId', asyncHandler(updateArticleComment));
router.delete('/comments/:commentId', asyncHandler(deleteArticleComment));
export default router;

