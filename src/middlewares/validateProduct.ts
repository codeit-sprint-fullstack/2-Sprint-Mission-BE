import { Request, Response, NextFunction, RequestHandler } from "express";
import { assert } from "superstruct";
import { CreateProduct, UpdateProduct } from "./structs";

export const validateCreateProduct: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    assert(req.body, CreateProduct);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdateProduct: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    assert(req.body, UpdateProduct);
    next();
  } catch (error) {
    next(error);
  }
};
