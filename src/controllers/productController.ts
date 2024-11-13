import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../middlewares/errorHandler";
import { assert } from "superstruct";
import { CreateProduct, UpdateProduct } from "../middlewares/structs";
import { ProductService } from "../services/productService";

export class ProductController {
  constructor(private service: ProductService) {}

  getProductById = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { id } = req.params;
      const product = await this.service.getProductById(Number(id));
      if (!product) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.send(product);
    }
  );

  createProduct = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { userId } = req.body;
      console.log("Received userId:", userId);
      assert(req.body, CreateProduct);
      const product = await this.service.createProduct(req.body);
      res.send(product);
    }
  );

  updateProduct = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      assert(req.body, UpdateProduct);
      const { id } = req.params;
      const product = await this.service.updateProduct(req.body, Number(id));
      res.send(product);
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
