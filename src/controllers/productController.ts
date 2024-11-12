import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const products = this.productService.getById(Number(id));
    res.send(products);
  };
}
