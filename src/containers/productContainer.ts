import { ProductController } from "../controllers/productController";
import { ProductService } from "../services/productService";
import { ProductRepository } from "../repositories/productRepository";
import { PrismaClient } from "@prisma/client";

class ProductContainer {
  private prisma: PrismaClient;
  private productRepository: ProductRepository;
  private productService: ProductService;
  private productController: ProductController;

  constructor() {
    this.prisma = new PrismaClient();
    this.productRepository = new ProductRepository(this.prisma);
    this.productService = new ProductService(this.productRepository);
    this.productController = new ProductController(this.productService);
  }

  ProductController(): ProductController {
    return this.productController;
  }
}

export const productContainer = new ProductContainer();
