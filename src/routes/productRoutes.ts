import { productContainer } from "../containers/productContainer";
import express from "express";

const productRouter = express.Router();

productRouter.route("/").post(productContainer.productController.createProduct);

productRouter
  .route("/:id")
  .get(productContainer.productController.getProductById)
  .patch(productContainer.productController.updateProduct)
  .delete(productContainer.productController.deleteProduct);

export default productRouter;
