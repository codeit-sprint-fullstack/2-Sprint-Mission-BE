import * as mock from './mock.js';
import { prismaClient as prisma } from '../src/postgresql/connection/postgres.connection.js';

function getRandomInteger(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const diff = maxFloored - minCeiled;
  const rand = Math.random();

  return Math.floor(rand * (diff + 1) + minCeiled);
}

async function main() {
  // postgres seeding part
  // delete part
  await prisma.$transaction([
    prisma.productTag.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.articleImage.deleteMany(),
    prisma.user.deleteMany(),
    prisma.product.deleteMany(),
    prisma.article.deleteMany(),
    prisma.comment.deleteMany(),
  ]);

  // create part
  // 관계형이 아닌 데이터부터 처리
  await prisma.$transaction([
    prisma.user.createMany({
      data: mock.users,
      skipDuplicates: true,
    }),
    prisma.product.createMany({
      data: mock.products,
      skipDuplicates: true,
    }),
  ]);

  // 관계형 데이터 처리
  // articles
  const userIds = (await prisma.user.findMany()).map(u => u.id);
  const newArticles = mock.articles.map(article => {
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
  const productIds = (await prisma.product.findMany()).map(p => p.id);
  const articleIds = (await prisma.article.findMany()).map(a => a.id);
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
  await prisma.comment.createMany({
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
  await prisma.productTag.createMany({
    data: newTags,
    skipDuplicates: true,
  });

  // Images
  const newProductImages = [];
  productIds.forEach(id => {
    const imgIndex = getRandomInteger(0, mock.productImages.length - 1);

    newProductImages.push({ image: mock.productImages[imgIndex], productId: id });
  });
  await prisma.productImage.createMany({
    data: newProductImages,
    skipDuplicates: true,
  });

  const newArticleImages = [];
  articleIds.forEach(id => {
    const imgIndex = getRandomInteger(0, mock.productImages.length - 1);

    newArticleImages.push({ image: mock.productImages[imgIndex], articleId: id });
  });
  await prisma.articleImage.createMany({
    data: newArticleImages,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    console.log('end of seed');
  });
