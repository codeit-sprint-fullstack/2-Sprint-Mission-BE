import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import productRouter from "./routes/productRoutes";

export function appConfig() {
  const app = express();
  app.use(express.json());

  app.use("/products", productRouter);
  app.use(errorHandler);

  return app;
}
