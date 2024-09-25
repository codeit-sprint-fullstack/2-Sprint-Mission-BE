import { PrismaClient } from "@prisma/client";
import mockData from "./mock.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.user.createMany({
    data: mockData.user,
    skipDuplicates: true
  });
  await prisma.product.createMany({
    data: mockData.product,
    skipDuplicates: true
  });
  await prisma.article.createMany({
    data: mockData.article,
    skipDuplicates: true
  });
  await prisma.productComment.createMany({
    data: mockData.productComment,
    skipDuplicates: true
  });
  await prisma.articleComment.createMany({
    data: mockData.articleComment,
    skipDuplicates: true
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
