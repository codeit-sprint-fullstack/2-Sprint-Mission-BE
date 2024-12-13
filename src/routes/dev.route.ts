import express from 'express';
import authController from '#containers/auth.container.js';
import commentController from '#containers/comment.container.js';
import userController from '#containers/user.container.js';
import tokenVerifier from '#containers/verify.container.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';

export const devRouter = express.Router();

devRouter.get('/users', userController.getUsersDev);

devRouter.get('/comments', commentController.getCommentsDev);

devRouter.get('/error', async (req, res) => {
  throw new Error('TEST ERROR');
});

devRouter.post('/files', (req, res, next) => {
  console.log(req.file);
  const path = `/dev/files/${req.file!.filename}`;
  res.json({ message: 'File Uploaded' });
});

devRouter.post(
  '/refresh',
  (req, res, next) => {
    console.log(req.cookies);
    next();
  },
  tokenVerifier.verifyRefreshToken,
  (req, res, next) => {
    const storage = getStorage();
    console.log('🚀 ~ storage:', storage);

    next();
  },
  authController.refreshToken,
);

export default devRouter;
