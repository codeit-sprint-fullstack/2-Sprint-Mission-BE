import express from 'express';
import 'express-async-errors';
import cors from 'cors';
// import { productController as mongodbProductController } from './mongodb/containers/product.container.js';
import { productController as postgresProductController } from './postgresql/containers/product.container.js';
import { articleController as postgresArticleController } from './postgresql/containers/article.container.js';
import { userController as postgresUserController } from './postgresql/containers/user.container.js';
import { commentController as postgresCommentController } from './postgresql/containers/comment.container.js';
import { Prisma } from '@prisma/client';
import { CastError, TypeError, ValidationError } from './error.js';
import { StructError } from 'superstruct';

const app = express();
app.use(cors());
app.use(express.json());

function validation(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const limit = req.query.limit;

  if (page && isNaN(Number(page)))
    throw new TypeError('page should be an integer');
  if (pageSize && isNaN(Number(pageSize)))
    throw new TypeError('pageSize should be an integer');
  if (limit && isNaN(Number(limit)))
    throw new TypeError('limit should be an integer');

  next();
}

app.use(validation);

/***************************    FOR_DEV  **************************************************/
{
  app.get('/dev/users', postgresUserController.getUsersDev);

  app.get('/dev/comments', postgresCommentController.getCommentsDev);

  app.get('/dev/error', async (req, res) => {
    throw new Error('TEST ERROR');
  });
}

/***************************    PRODUCTS    **************************************************/
{
  // get API
  // app.get('/products', (mongodbProductController.getProducts));
  app.get('/products', postgresProductController.getProducts);

  // get :id API
  // app.get(
  //   '/products/:id',
  //   (mongodbProductController.getProductById)
  // );
  app.get('/products/:id', postgresProductController.getProductById);

  // get :id/comments API
  app.get(
    '/products/:id/comments',
    postgresCommentController.getCommentsOfProduct
  );

  // post API
  // app.post(
  //   '/products/',
  //   (mongodbProductController.postProduct)
  // );
  app.post('/products/', postgresProductController.postProduct);

  // post :id/comments API
  app.post(
    '/products/:id/comments',
    postgresCommentController.postCommentOfProduct
  );

  // patch API
  // app.patch(
  //   '/products/:id',
  //   (mongodbProductController.patchProductById)
  // );
  app.patch('/products/:id', postgresProductController.patchProduct);

  // delete API
  // app.delete(
  //   '/products/:id',
  //   (mongodbProductController.deleteProductById)
  // );
  app.delete('/products/:id', postgresProductController.deleteProduct);
}

/***************************    ARTICLE    **************************************************/
{
  // get API
  app.get('/articles', postgresArticleController.getArticles);

  // get :id API
  app.get('/articles/:id', postgresArticleController.getArticleById);

  // get :id/comments API
  app.get(
    '/articles/:id/comments',
    postgresCommentController.getCommentsOfArticle
  );

  // post API
  app.post('/articles/', postgresArticleController.postArticle);

  // post :id/comments API
  app.post(
    '/articles/:id/comments',
    postgresCommentController.postCommentOfArticle
  );

  // patch API
  app.patch('/articles/:id', postgresArticleController.patchArticle);

  // delete API
  app.delete('/articles/:id', postgresArticleController.deleteArticle);
}

/***************************    COMMENT    **************************************************/
{
  // patch API
  app.patch('/comments/:id', postgresCommentController.patchComment);

  // delete API
  app.delete('/comments/:id', postgresCommentController.deleteComment);
}

/***************************    HANDLER    **************************************************/
function errorHandler(err, req, res, next) {
  console.error(err);
  if (
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof TypeError ||
    err instanceof ValidationError
  ) {
    res.status(400).send({ message: err.message });
  } else if (
    err instanceof StructError ||
    (err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025') ||
    err instanceof CastError
  ) {
    res.sendStatus(404);
  } else {
    res.status(500).send({ message: err.message });
  }
}

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
