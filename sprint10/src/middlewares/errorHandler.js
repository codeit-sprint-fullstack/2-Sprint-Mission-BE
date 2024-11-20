import HttpStatus from "../httpStatus.js";

export default function errorHandler(error, req, res, next) {
  let status = error.code | error.status ?? 500;
  if (status === 0) {
    status = 500;
  }
  console.log(error.name);
  console.log(error.message);
  if (error.name === 'StructError' || error instanceof Prisma.PrismaClientValidationError) {
    return res.status(HttpStatus.BAD_REQUEST).send({ name: error.name, message: error.message });
  }
  else if (e instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    return res.status(HttpStatus.NOT_FOUND).send({ name: error.name, message: error.message });
  }
  return res.status(status).json({
    path: req.path,
    method: req.method,
    message: error.message ?? 'Internal Server Error',
    data: error.data ?? undefined,
    date: new Date(),
  });
}
