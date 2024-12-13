import express from 'express';
import authController from '#containers/auth.container.js';
import tokenVerifier from '#containers/verify.container.js';
import hashPassword from '#middlewares/hash.js';

export const authRouter = express.Router();

authRouter.use('/', (req, res, next) => {
  console.log(req.cookies);
  next();
});
authRouter.post('/signUp', hashPassword, authController.signUp);
authRouter.post('/signIn', authController.signIn);
authRouter.get('/me', tokenVerifier.verifyAccessToken, authController.getMe);
authRouter.post('/refresh', tokenVerifier.verifyRefreshToken, authController.refreshToken);

export default authRouter;
