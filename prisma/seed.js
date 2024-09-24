import { PrismaClient } from "@prisma/client";
import { product, article, comment } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.comment.deleteMany();

  await prisma.product.createMany({
    data: product,
    skipDuplicates: true,
  });

  await prisma.article.createMany({
    data: article,
    skipDuplicates: true,
  });
  
  await prisma.comment.createMany({
    data: comment,
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
