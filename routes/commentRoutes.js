import express from 'express';
import {
  createComment,
  updateComment,
  deleteComment,
  getComments
} from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.post('/', createComment); // 댓글 등록
router.patch('/:commentId', updateComment); // 댓글 수정
router.delete('/:commentId', deleteComment); // 댓글 삭제
router.get('/', getComments); // 댓글 목록

export default router;
