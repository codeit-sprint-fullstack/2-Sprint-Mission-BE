import express from 'express';
import commentController from '#containers/comment.container.js';
import tokenVerifier from '#containers/verify.container.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .patch(tokenVerifier.verifyAccessToken, commentController.patchComment)
  .put(tokenVerifier.verifyAccessToken, commentController.putComment)
  .delete(tokenVerifier.verifyAccessToken, commentController.deleteComment);

export default commentRouter;
