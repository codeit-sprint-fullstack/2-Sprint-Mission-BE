import express from 'express';
import { productController as postgresProductController } from '../postgresql/containers/product.container.js';
import { commentController as postgresCommentController } from '../postgresql/containers/comment.container.js';
// import { productController as mongocbProductController } from '../mongodb/containers/product.container.js';

export const productRouter = express.Router();

// get API
// productRouter.get('/', (mongodbProductController.getProducts));
productRouter.get('/', postgresProductController.getProducts);

// get :id API
// productRouter.get('/:id', mongodbProductController.getProductById);
productRouter.get('/:id', postgresProductController.getProductById);

// get :id/comments API
productRouter.get('/:id/comments', postgresCommentController.getCommentsOfProduct);

// post API
// productRouter.post('/', mongodbProductController.postProduct);
productRouter.post('/', postgresProductController.postProduct);

// post :id/comments API
productRouter.post('/:id/comments', postgresCommentController.postCommentOfProduct);

// patch API
// productRouter.patch('/:id', mongodbProductController.patchProductById);
productRouter.patch('/:id', postgresProductController.patchProduct);

// delete API
// productRouter.delete('/:id', mongodbProductController.deleteProductById);
productRouter.delete('/:id', postgresProductController.deleteProduct);

export default productRouter;
