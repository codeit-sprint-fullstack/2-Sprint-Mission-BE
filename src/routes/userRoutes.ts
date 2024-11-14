import { Router } from "express";
import { userContainer } from "../containers/userContainer";

class UserRouter {
  public static userRoutes(): Router {
    const userRouter = Router();

    userRouter.route("/").post(userContainer.userController.createUser);
    userRouter.route("/login").post(userContainer.userController.loginUser);

    return userRouter;
  }
}

export default UserRouter;
