import { Request, Response, Router } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  public router: Router = Router();

  constructor(private service: ProductService) {
    this.routes();
  }

  private routes() {
    this.router.get("/:id", this.getById);
  }

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const products = this.service.getById(Number(id));
    res.send(products);
  };
}
