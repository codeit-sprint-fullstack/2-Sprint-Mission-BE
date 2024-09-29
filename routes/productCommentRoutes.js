import express from "express";
import {
  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
} from "../controllers/productCommentController.js";

const router = express.Router();

router.get("/:productId", getProductComments);
router.post("/:productId", createProductComment);
router.patch("/:id", updateProductComment);
router.delete("/:id", deleteProductComment);

export default router;
