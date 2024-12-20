import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    console.log(`Searching for product with ID: ${id}`);
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  createProduct = async (req: any): Promise<Product> => {
    return await this.prisma.product.create({
      data: req,
    });
  };

  updateProduct = async (req: any, id: string): Promise<Product> => {
    return await this.prisma.product.update({
      where: { id },
      data: req,
    });
  };

  deleteProduct = async (id: string): Promise<any> => {
    return await this.prisma.product.delete({
      where: { id },
    });
  };
}
