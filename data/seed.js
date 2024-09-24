import { products, users, articles, comments } from './mock.js';
import { mongodbConnection } from '../src/mongodb/db/mongodb.connection.js';
import { ProductModel } from '../src/mongodb/models/product.model.js';
import { prismaClient as prisma } from '../src/postgresql/db/postgres.connection.js';

function getRandomInteger(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const diff = maxFloored - minCeiled;
  const rand = Math.random();

  return Math.floor(rand * (diff + 1) + minCeiled);
}

const Product = new ProductModel(mongodbConnection);

async function main() {
  // postgres seeding part
  // delete part

  // 익명유저를 제외하고 삭제한다.
  await prisma.$transaction([
    prisma.user.deleteMany({
      where: { id: { not: '00000000-0000-0000-0000-000000000000' } },
    }),
    prisma.product.deleteMany(),
    prisma.article.deleteMany(),
    prisma.comment.deleteMany(),
  ]);

  // create part
  // 관계형이 아닌 데이터부터 처리
  await prisma.$transaction([
    prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    }),
    prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    }),
  ]);

  // 관계형 데이터 처리
  // articles
  const userIds = (await prisma.user.findMany()).map((u) => u.id);
  const newArticles = articles.map((article) => {
    return {
      ...article,
      ownerId: userIds[getRandomInteger(0, userIds.length - 1)],
    };
  });
  await prisma.article.createMany({
    data: newArticles,
    skipDuplicates: true,
  });

  // comments
  const productIds = (await prisma.product.findMany()).map((p) => p.id);
  const articleIds = (await prisma.article.findMany()).map((a) => a.id);
  const newComments = comments.map((comment) => {
    const relatedWithArticles = getRandomInteger(0, 1); // 0 or 1
    const relation = relatedWithArticles // 위에서 얻은 결과에 따라 랜덤하게 배정됨
      ? { articleId: articleIds[getRandomInteger(0, articleIds.length - 1)] }
      : { productId: productIds[getRandomInteger(0, productIds.length - 1)] };
    return {
      ...comment,
      ownerId: userIds[getRandomInteger(0, userIds.length - 1)],
      ...relation,
    };
  });

  await prisma.comment.createMany({
    data: newComments,
    skipDuplicates: true,
  });

  // mongodb seeding part
  await Product.deleteMany({}); // 인자로 삭제 조건을 전달
  await Product.insertMany(products); // 인자로 삽입할 데이터를 전달
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await mongodbConnection.close();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    await mongodbConnection.close();
    process.exit(1);
  });
