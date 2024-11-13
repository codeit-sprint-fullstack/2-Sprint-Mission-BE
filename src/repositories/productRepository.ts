import { PrismaClient } from "@prisma/client";

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  getById = async (id: number) => {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  };
}
