import express from "express";
import {
  getArticleById,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.get("/:id", getArticleById);
router.get("/", getArticles);
router.post("/", createArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
