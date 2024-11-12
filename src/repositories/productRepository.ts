import { PrismaClient } from "@prisma/client";

export class ProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}
