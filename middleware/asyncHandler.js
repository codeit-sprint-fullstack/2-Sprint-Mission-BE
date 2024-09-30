import { Prisma } from "@prisma/client";

export default function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        res
          .status(404)
          .send({ message: "Resource not found with the given ID" });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}
