import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
