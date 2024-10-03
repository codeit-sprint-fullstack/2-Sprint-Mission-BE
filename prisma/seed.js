import { PrismaClient } from "@prisma/client";
import { USERS, PRODUCTS, ARTICLES, PRODUCTCOMMENTS, ARTICLECOMMENTS } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();
  await prisma.product.deleteMany();
	await prisma.article.deleteMany();
	await prisma.productComment.deleteMany();
	await prisma.articleComment.deleteMany();

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
  await prisma.productComment.createMany({
    data: PRODUCTCOMMENTS,
    skipDuplicates: true,
  });
  await prisma.articleComment.createMany({
    data: ARTICLECOMMENTS,
    skipDuplicates: true,
  });
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
