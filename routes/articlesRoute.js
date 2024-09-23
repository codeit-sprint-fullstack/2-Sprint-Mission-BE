import express from 'express';
import asyncHandler from '../utils/ayncHandler.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
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
}));

router.get('/:id', asyncHandler( async (req, res) => {
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
}));

router.get('/:id/comments', asyncHandler( async (req, res) => {
  const { id } = req.params;
  const articleComments = await prisma.articleComment.findMany({
    where : { articleId: id },  // article에 속한 comments만 조회
  });
  if (articleComments.length === 0) {
    return res.status(404).send({message: 'No article comments found for the given article ID'});
  }
  res.send(articleComments);
}));

router.post('/', asyncHandler( async(req, res) => {
  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).send(article);
}));

router.patch('/:id', asyncHandler( async(req, res) =>{
  const { id } = req.params;
  const article = await prisma.article.update({
    where: { id },
    data: req.body
  });
  res.send(article);
}));

router.delete('/:id', asyncHandler( async(req, res) => {
  const { id } = req.params;
  await prisma.article.delete({
    where: { id },
  })
  res.sendStatus(204);
}));
export default router;