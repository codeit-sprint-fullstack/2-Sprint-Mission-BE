import { PrismaClient } from "@prisma/client";
import {
  PRODUCTS,
  PRODUCT_COMMENTS,
  ARTICLES,
  ARTICLE_COMMENTS,
} from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.product.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.articleComment.deleteMany();

  // 목 데이터 삽입
  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
  await prisma.productComment.createMany({
    data: PRODUCT_COMMENTS,
    skipDuplicates: true,
  });
  await prisma.article.createMany({
    data: ARTICLES,
    skipDuplicates: true,
  });
  await prisma.articleComment.createMany({
    data: ARTICLE_COMMENTS,
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
