import { PrismaClient } from '@prisma/client';
import * as mock from './mock/mock.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL 환경변수가 설정되지 않았습니다.');
}

const prismaClient = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

function getRandomInteger(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const diff = maxFloored - minCeiled;
  const rand = Math.random();

  return Math.floor(rand * (diff + 1) + minCeiled);
}

async function main() {
  await prismaClient.$transaction([
    prismaClient.productTag.deleteMany(),
    prismaClient.productImage.deleteMany(),
    prismaClient.articleImage.deleteMany(),
    prismaClient.user.deleteMany(),
    prismaClient.product.deleteMany(),
    prismaClient.article.deleteMany(),
    prismaClient.comment.deleteMany(),
  ]);

  // 관계형이 아닌 데이터부터 처리
  await prismaClient.user.createMany({
    data: mock.users,
    skipDuplicates: true,
  });

  // 관계형 데이터 처리
  // products
  const userIds = (await prismaClient.user.findMany()).map(u => u.id);
  const newProducts = mock.products.map(product => ({ ...product, ownerId: userIds[getRandomInteger(0, userIds.length - 1)] }));
  await prismaClient.product.createMany({
    data: newProducts,
    skipDuplicates: true,
  });

  // articles
  const newArticles = mock.articles.map(article => {
    return {
      ...article,
      ownerId: userIds[getRandomInteger(0, userIds.length - 1)],
    };
  });
  await prismaClient.article.createMany({
    data: newArticles,
    skipDuplicates: true,
  });

  // comments
  const productIds = (await prismaClient.product.findMany()).map(p => p.id);
  const articleIds = (await prismaClient.article.findMany()).map(a => a.id);
  const newComments = mock.comments.map(comment => {
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
  await prismaClient.comment.createMany({
    data: newComments,
    skipDuplicates: true,
  });

  // Tags
  const newTags = [];
  // NOTE 각 productId를 순회하면서
  productIds.forEach(id => {
    const howManyTags = getRandomInteger(1, 5); // NOTE 태그의 개수를 정한다. 1 ~ 5 사이
    const filter = [];
    for (let i = 0; i < howManyTags; i++) {
      let tagIndex = 0;
      // NOTE filter에 tagIndex가 존재한다면 다시 뽑는다.
      do {
        tagIndex = getRandomInteger(0, mock.productTags.length - 1);
      } while (filter.includes(tagIndex));

      newTags.push({ tag: mock.productTags[tagIndex], productId: id });
      filter.push(tagIndex);
    }
  });
  await prismaClient.productTag.createMany({
    data: newTags,
    skipDuplicates: true,
  });

  // Images
  const newProductImages = [];
  productIds.forEach(id => {
    const imgIndex = getRandomInteger(0, mock.productImages.length - 1);

    newProductImages.push({ originalName: mock.productImages[imgIndex], fileName: mock.productImages[imgIndex], productId: id });
  });
  await prismaClient.productImage.createMany({
    data: newProductImages,
    skipDuplicates: true,
  });

  const newArticleImages = [];
  articleIds.forEach(id => {
    const imgIndex = getRandomInteger(0, mock.productImages.length - 1);

    newArticleImages.push({ image: mock.productImages[imgIndex], articleId: id });
  });
  await prismaClient.articleImage.createMany({
    data: newArticleImages,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async e => {
    console.log(e);
    await prismaClient.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    console.log('end of seed');
  });
