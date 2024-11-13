import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { NextFunction } from "express-serve-static-core";

export function asyncErrorHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.code ?? 500;
  console.error(error);
  if (
    error instanceof Prisma.PrismaClientValidationError ||
    error.name === "StructError"
  ) {
    res.status(400).send({ message: error.message });
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    res.sendStatus(404).send({ message: error.message });
  } else {
    res.status(500).send({ message: error.message });
  }
}
