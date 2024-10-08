import express from "express";
import {
  getArticleComments,
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,
} from "../controllers/articleCommentController.js";

const router = express.Router();

router.get("/:articleId", getArticleComments);
router.post("/:articleId", createArticleComment);
router.patch("/:id", updateArticleComment);
router.delete("/:id", deleteArticleComment);

export default router;
