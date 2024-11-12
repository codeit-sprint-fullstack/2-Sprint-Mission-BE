import { ProductController } from "./../controllers/productController";
import { ProductService } from "../services/productService";
import express from "express";

const productRouter = express.Router();

const productService = new ProductService();
const productController = ProductController.getInstance(productService);

productRouter.get("/:id", productController.getById);

export default productRouter;
