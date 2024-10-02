import express from 'express';
import {
  createProductComment,
  updateProductComment,
  deleteProductComment,
  getProductComments
} from '../controllers/ProductCommentController.js';

const router = express.Router({ mergeParams: true });

router.post('/', createProductComment); // 댓글 등록
router.patch('/:commentId', updateProductComment); // 댓글 수정
router.delete('/:commentId', deleteProductComment); // 댓글 삭제
router.get('/', getProductComments); // 댓글 목록

export default router;
