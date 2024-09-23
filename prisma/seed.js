import { PrismaClient } from "@prisma/client";
import { mockData } from "./mock.js";
const prisma = new PrismaClient();

async function main() {
  const inputData = mockData.map(({ id, ownerId, ...rest }) => {
    return rest;
  });
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: inputData,
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
