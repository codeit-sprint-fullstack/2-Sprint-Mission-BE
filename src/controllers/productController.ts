import { Request, Response } from "express";
import { asyncErrorHandler } from "../middlewares/errorHandler";
import { ProductService } from "../services/productService";
import { AuthRequest } from "../types/requestType";

export class ProductController {
  constructor(private service: ProductService) {}

  getProductById = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
      const product = await this.service.getProductById(Number(id));
      if (!product) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.json(product);
    }
  );

  createProduct = asyncErrorHandler(
    async (req: AuthRequest, res: Response): Promise<any> => {
      const product = await this.service.createProduct({
        ...req.body,
        userId: req.auth?.userId,
      });
      res.json(product);
    }
  );

  updateProduct = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
      const product = await this.service.updateProduct(req.body, Number(id));
      res.json(product);
    }
  );

  deleteProduct = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
      const product = await this.service.deleteProduct(Number(id));
      res.send(204);
    }
  );
}
