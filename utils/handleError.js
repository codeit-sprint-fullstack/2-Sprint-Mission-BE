import { AppError } from '../utils/globalErrorHandler.js';
import { Prisma } from '@prisma/client';

export const handleError = (err, next) => {
  if (err.name === 'StructError') {
    return next(new AppError(400, err.message));
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return next(new AppError(404, 'Not found'));
  }
  return next(new AppError(500, 'Internal Server Error'));
};
