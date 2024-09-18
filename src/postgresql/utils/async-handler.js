import { Prisma } from '@prisma/client';
import { StructError } from 'superstruct';
import { CastError, TypeError, ValidationError } from './error.js';

export function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.error(e);
      if (
        e instanceof Prisma.PrismaClientValidationError ||
        e instanceof TypeError ||
        e instanceof ValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof StructError ||
        (e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2025') ||
        e instanceof CastError
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}
