import prisma from "../config/prisma";

function getById(id: number) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export default { getById };
