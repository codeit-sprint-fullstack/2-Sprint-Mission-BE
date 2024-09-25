import express from "express";
import {
  getArticleComments,
  getProductComments,
  getArticleComment,
  getProductComment,
  createArticleComment,
  createProductComment,
  updateArticleComment,
  updateProductComment,
  deleteArticleComment,
  deleteProductComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Article
router.get("/articles/:articleId/comments", getArticleComments);
router.get("/articles/:articleId/comments/:id", getArticleComment);
router.post("/articles/:articleId/comments", createArticleComment);
router.patch("/articles/:articleId/comments/:id", updateArticleComment);
router.delete("/articles/:articleId/comments/:id", deleteArticleComment);

// Product
router.get("/products/:productId/comments", getProductComments);
router.get("/products/:productId/comments/:id", getProductComment);
router.post("/products/:productId/comments", createProductComment);
router.patch("/products/:productId/comments/:id", updateProductComment);
router.delete("/products/:productId/comments/:id", deleteProductComment);

export default router;
