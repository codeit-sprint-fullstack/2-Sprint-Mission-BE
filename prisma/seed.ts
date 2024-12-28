import { PrismaClient } from "@prisma/client";
import { PRODUCTS, ARTICLES } from "./mock.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.comment.deleteMany();

  for (const products of PRODUCTS) {
    // comment와 product를 분리
    const { comments, ...productData } = products;

    const product = await prisma.product.create({
      data: { ...productData },
    });

    // comment가 있을 경우 comment를 추가
    if (comments && comments.length > 0) {
      for (const commentData of comments) {
        await prisma.comment.create({
          data: {
            content: commentData.content,
            productId: product.id,
          },
        });
      }
    }
  }

  for (const articles of ARTICLES) {
    // comment와 article을 분리
    const { comments, ...articleData } = articles;

    const article = await prisma.article.create({
      data: { ...articleData },
    });

    // comment가 있을 경우 comment를 추가
    if (comments && comments.length > 0) {
      for (const commentData of comments) {
        await prisma.comment.create({
          data: {
            content: commentData.content,
            articleId: article.id,
          },
        });
      }
    }
  }
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