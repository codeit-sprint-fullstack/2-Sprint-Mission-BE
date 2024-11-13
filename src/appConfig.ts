import express from "express";
import { productContainer } from "./singleton/productContainerSingleton";
import { errorHandler } from "./middlewares/errorHandler";

export function appConfig() {
  const app = express();
  app.use(express.json());

  app.use("/products", productContainer.productController.router);

  app.use(errorHandler);

  return app;
}
