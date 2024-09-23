import { PrismaClient } from '@prisma/client';
import {
  USERS,
  USER_PREFERENCES,  
  PRODUCTS,
  ARTICLES,
  ARTICLE_COMMENTS,
  PRODUCT_COMMENTS
} from './mock.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  // foreign key 제약 조건을 고려하여 종속된 데이터부터 삭제
  await prisma.userPreference.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
  
  // 목 데이터 삽입
  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });

  await prisma.article.createMany({
    data: ARTICLES,
    skipDuplicates: true,
  });

  // ArticleComment 데이터 삽입 (id 자동 생성을 위해 id 필드를 제외하고 삽입)
  await prisma.articleComment.createMany({
    data: ARTICLE_COMMENTS.map(({ id, ...rest }) => rest), // id를 뺀 나머지 데이터만 삽입
    skipDuplicates: true,
  });

  await prisma.productComment.createMany({
    data: PRODUCT_COMMENTS.map(({id, ...rest}) => rest),
    skipDuplicates: true,
  });

  await Promise.all(
    USERS.map(async (user) => {
      await prisma.user.create({ data: user });
    })
  );
  /* 
  // user를 순차적으로 삽입하려면
  for (const user of USERS) {
    await prisma.user.create({ data: user });
  }  
  */

  await prisma.userPreference.createMany({
    data: USER_PREFERENCES,
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
