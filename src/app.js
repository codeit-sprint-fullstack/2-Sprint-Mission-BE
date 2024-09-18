import express from 'express';
import cors from 'cors';
// import { asyncHandler as mongodbAsyncHandler } from './mongodb/utils/async-handler.js';
// import { productController as mongodbProductController } from './mongodb/containers/product.container.js';
import { asyncHandler as postgresAsyncHandler } from './postgresql/utils/async-handler.js';
import { productController as postgresProductController } from './postgresql/containers/product.container.js';
import { articleController as postgresArticleController } from './postgresql/containers/article.container.js';
import { userController as postgresUserController } from './postgresql/containers/user.container.js';
import { commentController as postgresCommentController } from './postgresql/containers/comment.container.js';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

/***************************    FOR_DEV  **************************************************/
{
  app.get(
    '/dev/users',
    postgresAsyncHandler(postgresUserController.getUsersDev)
  );

  app.get(
    '/dev/comments',
    postgresAsyncHandler(postgresCommentController.getCommentsDev)
  );
}

/***************************    PRODUCTS  **************************************************/
{
  // get API
  // app.get('/products', mongodbAsyncHandler(mongodbProductController.getProducts));
  app.get(
    '/products',
    postgresAsyncHandler(postgresProductController.getProducts)
  );

  // get :id API
  // app.get(
  //   '/products/:id',
  //   mongodbAsyncHandler(mongodbProductController.getProductById)
  // );
  app.get(
    '/products/:id',
    postgresAsyncHandler(postgresProductController.getProductById)
  );

  // get :id/comments API
  app.get(
    '/products/:id/comments',
    postgresAsyncHandler(postgresCommentController.getCommentsOfProduct)
  );

  // post API
  // app.post(
  //   '/products/',
  //   mongodbAsyncHandler(mongodbProductController.postProduct)
  // );
  app.post(
    '/products/',
    postgresAsyncHandler(postgresProductController.postProduct)
  );

  // post :id/comments API
  app.post(
    '/products/:id/comments',
    postgresAsyncHandler(postgresCommentController.postCommentOfProduct)
  );

  // patch API
  // app.patch(
  //   '/products/:id',
  //   mongodbAsyncHandler(mongodbProductController.patchProductById)
  // );
  app.patch(
    '/products/:id',
    postgresAsyncHandler(postgresProductController.patchProductById)
  );

  // delete API
  // app.delete(
  //   '/products/:id',
  //   mongodbAsyncHandler(mongodbProductController.deleteProductById)
  // );
  app.delete(
    '/products/:id',
    postgresAsyncHandler(postgresProductController.deleteProductById)
  );
}

/***************************    ARTICLE  **************************************************/
{
  // get API
  app.get(
    '/articles',
    postgresAsyncHandler(postgresArticleController.getArticles)
  );

  // get :id API
  app.get(
    '/articles/:id',
    postgresAsyncHandler(postgresArticleController.getArticleById)
  );

  // get :id/comments API
  app.get(
    '/articles/:id/comments',
    postgresAsyncHandler(postgresCommentController.getCommentsOfArticle)
  );

  // post API
  app.post(
    '/articles/',
    postgresAsyncHandler(postgresArticleController.postArticle)
  );

  // post :id/comments API
  app.post(
    '/articles/:id/comments',
    postgresAsyncHandler(postgresCommentController.postCommentOfArticle)
  );

  // patch API
  app.patch(
    '/articles/:id',
    postgresAsyncHandler(postgresArticleController.patchArticleById)
  );

  // delete API
  app.delete(
    '/articles/:id',
    postgresAsyncHandler(postgresArticleController.deleteArticleById)
  );
}

/***************************    COMMENT  **************************************************/
{
  // patch API
  app.patch(
    '/comments/:id',
    postgresAsyncHandler(postgresCommentController.patchCommentById)
  );

  // delete API
  app.delete(
    '/comments/:id',
    postgresAsyncHandler(postgresCommentController.deleteCommentById)
  );
}
