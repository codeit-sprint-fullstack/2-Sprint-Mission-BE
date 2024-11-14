import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import ProductRouter from "./routes/productRoutes";

export function appConfig() {
  const app = express();
  app.use(express.json());

  app.use("/products", ProductRouter.productRoutes());
  app.use(errorHandler);

  return app;
}
