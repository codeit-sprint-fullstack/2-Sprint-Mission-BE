import { PrismaClient } from '@prisma/client';
import { PRODUCTS } from './mock/product.mock';

const prisma = new PrismaClient();

async function main() {
  //기존 데이터 삭제
  await prisma.product.deleteMany();

  // 목 데이터 삽입
  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
}

//데이터베이스와의 연결 종료
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
