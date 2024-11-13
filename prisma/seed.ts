import { PrismaClient } from "@prisma/client";
import { PRODUCTS, ARTICLES, COMMENTS, LIKES, USERS } from "./mock";

const prisma = new PrismaClient();

async function main() {
  //기존 데이터 삭제
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();

  // 목 데이터 삽입
  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });
  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
  await prisma.article.createMany({
    data: ARTICLES,
    skipDuplicates: true,
  });
  await prisma.comment.createMany({
    data: COMMENTS,
    skipDuplicates: true,
  });
  await prisma.like.createMany({
    data: LIKES,
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
