import express from "express";
import asyncHandler from "../middleware/ayncHandler.js";
import {
  getCommentsByProductId,
  createProductComment,
  updateProductComment,
  deleteProductComment,
} from "../controllers/productCommentController.js";

const router = express.Router();
// /products
router.get("/:productId/comments", asyncHandler(getCommentsByProductId));
router.post("/:productId/comments", asyncHandler(createProductComment));
router.patch("/comments/:commentId", asyncHandler(updateProductComment));
router.delete("/comments/:commentId", asyncHandler(deleteProductComment));
export default router;
