import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import UserRouter from "./routes/userRoutes";
import ProductRouter from "./routes/productRoutes";

export function appConfig() {
  const app = express();
  app.use(express.json());

  app.use("/users", UserRouter.userRoutes());
  app.use("/products", ProductRouter.productRoutes());
  app.use(errorHandler);

  return app;
}
