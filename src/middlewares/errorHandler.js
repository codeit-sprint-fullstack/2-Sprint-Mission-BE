import { Prisma } from "@prisma/client";

export default function errorHandler(error, req, res, next) {
    const status = error.code ?? 500;
    console.error(error);
    return res.status(status).json({
      path: req.path,
      method: req.method,
      message: error.message ?? 'Internal Server Error',
      data: error.data ?? undefined,
      date: new Date(),
    });
  }
  

  export function asyncHandler(handler) {
    return async function (req, res) {
      try {
        await handler(req, res);
      } catch (e) {
        if (e.name === "StructError" || e instanceof Prisma.PrismaClientValidationError) {
          res.status(400).send({ message: e.message });
        } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            res.sendStatus(404);
          } else if (e.code === "P2002") {
            console.error("Unique constraint failed:", e.meta); // 고유 제약 조건 위반 로그 추가
            res.status(400).send({ message: "Unique constraint failed", details: e.meta });
          } else {
            res.status(500).send({ message: e.message });
          }
        } else {
          res.status(500).send({ message: e.message });
        }
      }
    };
}