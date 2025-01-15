import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { DBClient } from 'src/database/prisma/prisma.service';
import { UploadModule } from 'src/database/s3/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, DBClient],
  exports: [ProductService],
})
export class ProductModule {}
