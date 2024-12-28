import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadModule } from 'src/database/s3/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
