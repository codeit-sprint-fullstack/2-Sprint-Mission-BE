import { prismaClient } from '#connection/postgres.connection.js';
import { ProductController } from '#controllers/product.controller.js';
import { ProductRepository } from '#repositories/product.repository.js';
import { ProductService } from '#services/product.service.js';

const productModel = new ProductRepository(prismaClient);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

export default productController;
