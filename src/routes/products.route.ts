import express from 'express';
import commentController from '#containers/comment.container.js';
import productController from '#containers/product.container.js';
import tokenVerifier from '#containers/verify.container.js';
import validateProduct from '#middlewares/product.validation.js';

export const productRouter = express.Router();

productRouter
  .route('/')
  .get(productController.getProducts)
  .post(tokenVerifier.verifyAccessToken, validateProduct, productController.postProduct);

productRouter
  .route('/:id')
  .get(productController.getProductById)
  .patch(tokenVerifier.verifyAccessToken, validateProduct, productController.patchProduct)
  .delete(tokenVerifier.verifyAccessToken, productController.deleteProduct);

productRouter
  .route('/:id/comments')
  .get(commentController.getCommentsOfProduct)
  .post(tokenVerifier.verifyAccessToken, commentController.postCommentOfProduct);

productRouter
  .route('/:id/like')
  .post(tokenVerifier.verifyAccessToken, productController.postProductLike)
  .delete(tokenVerifier.verifyAccessToken, productController.deleteProductLike);

export default productRouter;
