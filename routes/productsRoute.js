import express from "express";
import asyncHandler from "../middleware/ayncHandler.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deletProduct,
} from "../controllers/productController.js";

const router = express.Router();
// /products
router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));
router.post("/", asyncHandler(createProduct));
router.patch("/:id", asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deletProduct));

export default router;
