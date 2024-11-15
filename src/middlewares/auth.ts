import { Request, Response, NextFunction, RequestHandler } from "express";
import { expressjwt } from "express-jwt";
import { asyncErrorHandler } from "./errorHandler";
import { ProductRepository } from "../repositories/productRepository";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/requestType";

export const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "auth",
}) as RequestHandler;

export const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.refreshToken,
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

export const debugRefreshToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    console.error("Refresh token is missing");
    res.status(400).json({ error: "Refresh token is missing" });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
    console.log("Decoded JWT:", decoded); // 디코딩된 JWT 출력
    req.auth = decoded as { userId: string }; // userId를 req.auth에 추가
    next();
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: "Invalid refresh token" });
  }
};
