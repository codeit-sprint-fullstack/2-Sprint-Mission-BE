import express from "express";
import { ProductContainer } from "./containers/productContainer";

export function appConfig() {
  const app = express();
  app.use(express.json());

  const productContainer = new ProductContainer();

  app.use("/products", productContainer.productController.router);

  return app;
}
