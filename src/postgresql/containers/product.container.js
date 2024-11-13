import { prismaClient } from '../connection/postgres.connection.js';
import { ProductDB } from '../db/product.db.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';

const productModel = new ProductDB(prismaClient);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

export { productController };
