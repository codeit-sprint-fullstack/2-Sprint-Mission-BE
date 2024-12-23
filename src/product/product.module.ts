import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository.js';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [],
})
export class ProductModule {}
