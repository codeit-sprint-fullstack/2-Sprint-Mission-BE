import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProduct(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}
