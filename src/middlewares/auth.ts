import { Request, Response, NextFunction, RequestHandler } from "express";
import { expressjwt } from "express-jwt";
import { asyncErrorHandler } from "./errorHandler";
import { ProductRepository } from "../repositories/productRepository";

export const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "auth",
}) as RequestHandler;

export const verifyProductAuth = (productRepository: ProductRepository) =>
  asyncErrorHandler(
    async (req: any, res: Response, next: NextFunction): Promise<any> => {
      const { id: productId } = req.params;
      const product = await productRepository.getProductById(Number(productId));
      if (!product) {
        const error = new Error("product not found");
        throw error;
      }
      if (product.userId !== req.auth.userId) {
        const error = new Error("Forbidden");
        throw error;
      }
      return next();
    }
  );
