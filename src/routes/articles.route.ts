import express from 'express';
import articleController from '#containers/article.container.js';
import commentController from '#containers/comment.container.js';
import tokenVerifier from '#containers/verify.container.js';

export const articleRouter = express.Router();

articleRouter.route('/').get(articleController.getArticles).post(tokenVerifier.verifyAccessToken, articleController.postArticle);

articleRouter
  .route('/:id')
  .get(articleController.getArticleById)
  .patch(tokenVerifier.verifyAccessToken, articleController.patchArticle)
  .delete(tokenVerifier.verifyAccessToken, articleController.deleteArticle);

articleRouter
  .route('/:id/comments')
  .get(commentController.getCommentsOfArticle)
  .post(tokenVerifier.verifyAccessToken, commentController.postCommentOfArticle);

articleRouter
  .route('/:id/like')
  .post(tokenVerifier.verifyAccessToken, articleController.postArticleLike)
  .delete(tokenVerifier.verifyAccessToken, articleController.deleteArticleLike);

export default articleRouter;
