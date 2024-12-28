import { NestFactory } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import USERS from './mock/mock.user';
import { AppModule } from '../src/app.module';
import PRODUCTS from './mock/mock.product';
import PRODUCT_FAVORITES from './mock/mock.product.favorite';
import { PRODUCT_IMAGES } from './mock/mock.productImage';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prismaService = appContext.get(PrismaService);
  await main(prismaService);
  await appContext.close();
}
async function main(prisma: PrismaService) {
  await prisma.productImage.deleteMany();
  await prisma.productFavorite.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });
  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
  await prisma.productFavorite.createMany({
    data: PRODUCT_FAVORITES,
    skipDuplicates: true,
  });
  await prisma.productImage.createMany({
    data: PRODUCT_IMAGES,
    skipDuplicates: true,
  });

  console.log('Seeding completed.');
}
bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
