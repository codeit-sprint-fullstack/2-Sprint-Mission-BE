import express from 'express';
import { articleController as postgresArticleController } from '../postgresql/containers/article.container.js';
import { commentController as postgresCommentController } from '../postgresql/containers/comment.container.js';

export const articleRouter = express.Router();

articleRouter.route('/').get(postgresArticleController.getArticles).post(postgresArticleController.postArticle);

articleRouter
  .route('/:id')
  .get(postgresArticleController.getArticleById)
  .patch(postgresArticleController.patchArticle)
  .delete(postgresArticleController.deleteArticle);

articleRouter
  .route('/:id/comments')
  .get(postgresCommentController.getCommentsOfArticle)
  .post(postgresCommentController.postCommentOfArticle);

export default articleRouter;
