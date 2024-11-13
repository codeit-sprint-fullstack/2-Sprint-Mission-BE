import { mongodbConnection } from '../db/mongodb.connection.js';
import { ProductModel } from '../models/product.model.js';
import { ProductService } from '../services/product.service.js';
import { ProductController } from '../controllers/product.controller.js';

const productModel = new ProductModel(mongodbConnection);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

export { productController };
