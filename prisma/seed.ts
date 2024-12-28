import { PrismaClient } from '@prisma/client';
import { UserMocks } from './mocks/userMocks';
import { ArticleMocks } from './mocks/articleMocks';
import { ProductMocks } from './mocks/productMocks';
// import { CommentMocks } from './mocks/commentMocks';
// import { LikeMocks } from './mocks/likeMocks';
import { HashingPassword } from '../src/utils/HashPassword';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();
  // await prisma.comment.deleteMany();
  // await prisma.like.deleteMany();

  const userMocks = await Promise.all(
    UserMocks.map(async (user) => ({
      ...user,
      password: await HashingPassword(user.password),
    })),
  );
  await prisma.user.createMany({
    data: userMocks,
    skipDuplicates: true,
  });
  await prisma.article.createMany({
    data: ArticleMocks,
    skipDuplicates: true,
  });
  await prisma.product.createMany({
    data: ProductMocks,
    skipDuplicates: true,
  });
  // await prisma.comment.createMany({
  //   data: CommentMocks,
  //   skipDuplicates: true,
  // });
  // await prisma.like.createMany({
  //   data: LikeMocks,
  //   skipDuplicates: true,
  // });
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
