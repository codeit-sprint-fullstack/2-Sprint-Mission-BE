import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../middlewares/errorHandler";
import { ProductService } from "../services/productService";

export class ProductController {
  public router: Router = Router();

  constructor(private service: ProductService) {
    this.routes();
  }

  private routes() {
    this.router.get("/:id", this.getById);
  }

  getById = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
      const products = await this.service.getById(Number(id));
      res.send(products);
    }
  );
}
