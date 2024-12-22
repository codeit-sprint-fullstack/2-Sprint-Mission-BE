import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import UserRouter from "./routes/userRoutes";
import ProductRouter from "./routes/productRoutes";

export function appConfig() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.use("/users", UserRouter.userRoutes());
  app.use("/products", ProductRouter.productRoutes());
  app.use(errorHandler);

  return app;
}
