import { PrismaClient } from "@prisma/client";

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  getById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}
