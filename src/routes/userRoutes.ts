import { Router } from "express";
import { userContainer } from "../containers/userContainer";
import { debugRefreshToken, verifyRefreshToken } from "../middlewares/auth";

class UserRouter {
  public static userRoutes(): Router {
    const userRouter = Router();

    userRouter.route("/").post(userContainer.userController.createUser);
    userRouter.route("/login").post(userContainer.userController.loginUser);
    userRouter
      .route("/token/refresh")
      .post(
        verifyRefreshToken,
        debugRefreshToken,
        userContainer.userController.refreshAccessToken
      );

    return userRouter;
  }
}

export default UserRouter;
