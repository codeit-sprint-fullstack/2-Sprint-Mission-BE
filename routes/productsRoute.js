import express from 'express';
import asyncHandler from '../utils/ayncHandler.js';
import { 
  createProduct, 
  deletProduct, 
  getProcuts, 
  getProductById, 
  updateProduct 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', asyncHandler(getProcuts));
router.get('/:id', asyncHandler(getProductById));
router.post('/', asyncHandler(createProduct));
router.patch('/:id', asyncHandler(updateProduct));
router.delete('/:id', asyncHandler(deletProduct));

export default router;