import express from "express";
import { productContainer } from "../containers/productContainer";

const productRouter = express.Router();
const productController = productContainer.ProductController();

productRouter.get("/:id", productController.getById);

export default productRouter;
