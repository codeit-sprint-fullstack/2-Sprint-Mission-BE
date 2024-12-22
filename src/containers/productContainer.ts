import { ProductController } from "../controllers/productController";
import { ProductService } from "../services/productService";
import { ProductRepository } from "../repositories/productRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

export const productContainer = { productController, productRepository };
