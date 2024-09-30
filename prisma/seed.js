import { PrismaClient } from "@prisma/client";
import {
  USERS,
  PRODUCTS,
  ARTICLES,
  ARTICLE_COMMENTS,
  PRODUCT_COMMENTS,
} from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();

  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });

  await prisma.article.createMany({
    data: ARTICLES,
    skipDuplicates: true,
  });

  await prisma.articleComment.createMany({
    data: ARTICLE_COMMENTS.map(({ id, ...rest }) => rest), // id를 뺀 나머지 데이터만 삽입
    skipDuplicates: true,
  });

  await prisma.productComment.createMany({
    data: PRODUCT_COMMENTS.map(({ id, ...rest }) => rest),
    skipDuplicates: true,
  });

  await Promise.all(
    USERS.map(async (user) => {
      await prisma.user.create({ data: user });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
