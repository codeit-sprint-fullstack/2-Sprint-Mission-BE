import express from 'express';
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts
} from '../controllers/productController.js';
import productCommentRoutes from './productCommentRoutes.js';

const router = express.Router();

router.post('/', createProduct); // 상품 등록
router.get('/:id', getProductById); // 상품 상세 조회
router.patch('/:id', updateProduct); // 상품 수정
router.delete('/:id', deleteProduct); // 상품 삭제
router.get('/', getProducts); // 상품 목록 조회

router.use('/:productId/comments', productCommentRoutes);

export default router;
