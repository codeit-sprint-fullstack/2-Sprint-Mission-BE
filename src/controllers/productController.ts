import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  private static instance: ProductController;
  private productService: ProductService;

  private constructor(productService: ProductService) {
    this.productService = productService;
  }
  public static getInstance(productService: ProductService): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController(productService);
    }
    return ProductController.instance;
  }

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const products = this.productService.getById(Number(id));
    res.send(products);
  };
}
