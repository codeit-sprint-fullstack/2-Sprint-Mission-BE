import { PrismaClient } from "@prisma/client";
import { mockProductData, mockUserData, mockArticleData } from "./mock.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: mockProductData,
    skipDuplicates: true
  });
  // await prisma.user.deleteMany();
  // await prisma.user.createMany({
  //   data: mockUserData,
  //   skipDuplicates: true
  // });
  // await prisma.article.deleteMany();
  // const articleSeed = mockArticleData.map(async (article) => {
  //   await prisma.article.create({
  //     data: article
  //   });
  // });
  // await Promise.all(articleSeed);
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
