"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductContainer = void 0;
const productController_1 = require("../controllers/productController");
const productService_1 = require("../services/productService");
const productRepository_1 = require("../repositories/productRepository");
const client_1 = require("@prisma/client");
class ProductContainer {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.productRepository = new productRepository_1.ProductRepository(this.prisma);
        this.productService = new productService_1.ProductService(this.productRepository);
        this.productController = new productController_1.ProductController(this.productService);
    }
}
exports.ProductContainer = ProductContainer;
