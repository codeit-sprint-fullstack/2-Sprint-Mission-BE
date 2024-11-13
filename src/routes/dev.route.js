import express from 'express';
import { userController as postgresUserController } from '../postgresql/containers/user.container.js';
import { commentController as postgresCommentController } from '../postgresql/containers/comment.container.js';

export const devRouter = express.Router();

devRouter.get('/users', postgresUserController.getUsersDev);

devRouter.get('/comments', postgresCommentController.getCommentsDev);

devRouter.get('/error', async (req, res) => {
  throw new Error('TEST ERROR');
});

export default devRouter;
