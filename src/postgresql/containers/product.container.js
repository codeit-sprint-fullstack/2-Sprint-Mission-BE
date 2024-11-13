import { prismaClient } from '../connection/postgres.connection.js';
import { ProductRepo } from '../repo/product.repo.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';

const productModel = new ProductRepo(prismaClient);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

export { productController };
