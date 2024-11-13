import express from "express";
import { productContainer } from "./singleton/productContainerSingleton";

export function appConfig() {
  const app = express();
  app.use(express.json());

  app.use("/products", productContainer.productController.router);

  return app;
}
