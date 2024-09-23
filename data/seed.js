import { PrismaClient } from "@prisma/client";
import { data } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  //제품 삭제, 태그 삭제
  await prisma.product.deleteMany();


  await prisma.product.createMany({
    data: data,
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
