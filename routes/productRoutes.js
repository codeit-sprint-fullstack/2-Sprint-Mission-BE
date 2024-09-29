import express from "express";
import { getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/:id", getProductById);

export default router;
