import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
