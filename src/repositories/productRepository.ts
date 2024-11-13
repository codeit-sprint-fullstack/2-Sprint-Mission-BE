import { PrismaClient } from "@prisma/client";

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  getProductById = async (id: number) => {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  };

  createProduct = async (req: any) => {
    return await this.prisma.product.create({
      data: req,
    });
  };

  updateProduct = async (req: any, id: number) => {
    return await this.prisma.product.update({
      where: { id },
      data: req,
    });
  };

  deleteProduct = async (id: number) => {
    return await this.prisma.product.delete({
      where: { id },
    });
  };
}
