import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export function asyncErrorHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function errorHandler(
  error: any,
  req: Request,
  res: any,
  next: NextFunction
) {
  console.error(error);
  if (error.message === "User already exists") {
    return res.status(422).json({
      message: error.message,
      email: req.body.email,
    });
  } else if (error.message === "Unauthorized") {
    return res.status(401).json({ message: error.message });
  } else if (
    error instanceof Prisma.PrismaClientValidationError ||
    error.name === "StructError"
  ) {
    return res.status(400).json({ message: error.message });
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return res.status(404).json({ message: error.message });
  } else {
    return res.status(500).json({ message: error.message });
  }
}
