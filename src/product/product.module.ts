import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService, PrismaService],
  exports: [],
})
export class ProductModule {}
