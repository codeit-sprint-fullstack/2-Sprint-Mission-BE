import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { Product } from '@prisma/client';
import type { CreateProduct, PatchProduct } from './product.type.js';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProductById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  createProduct = async (data: CreateProduct): Promise<Product> => {
    return await this.prisma.product.create({
      data,
    });
  };

  updateProduct = async (data: PatchProduct, id: string): Promise<Product> => {
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  };

  deleteProduct = async (id: string): Promise<Product> => {
    return await this.prisma.product.delete({
      where: { id },
    });
  };
}
