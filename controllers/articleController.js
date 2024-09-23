import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getArticles = async (req, res) => {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;
  const offset = (page-1) * pageSize;
  const skip = offset;
  const take = parseInt(pageSize);

  let orderConfig;
  switch (orderBy) {
    case 'oldest' :
      orderConfig = { createdAt : 'asc' };
      break;
    case 'recent' :
    default : 
      orderConfig = { createdAt : 'desc' };
  }

  const where = {
    AND: [
      keyword ? {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },   // 대소문자 구분 없이 검색
          { content: { contains: keyword, mode: 'insensitive' } } 
        ]
      } : {}
    ]
  };
  // 게시글 리스트
  const articles = await prisma.article.findMany({
    where, 
    orderBy: orderConfig,
    skip,
    take, 
    include: {
      articleComments: true
    }    
  });
  // 총 개수
  const totalCount = await prisma.article.count({ where });

  res.send({
    list: articles,
    totalCount: totalCount
  });
};

export const getArticleById =  async (req, res) => {
  const { id } = req.params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      articleComments: true, 
    }
  });
  if (!article) {
    return res.status(404).send({message: 'No article found with the given ID'});
  }
  res.send(article);
};

export const createArticle = async(req, res) => {
  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(article);
};

export const updateArticle = async(req, res) =>{
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body
  });
  res.send(article);
};

export const deleteArticle =  async(req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  })
  res.sendStatus(204);
};