import express from 'express';
import asyncHandler from '../utils/ayncHandler.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '', category ='' } = req.query;

  const offset = (page -1) * pageSize;
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
          { name: { contains: keyword, mode: 'insensitive' } },   // 대소문자 구분 없이 검색
          { description: { contains: keyword, mode: 'insensitive' } } 
        ]
      } : {},
      category ? { category: category } : {}
    ]
  };
  // 상품 리스트
  const products = await prisma.product.findMany({
    where, 
    orderBy: orderConfig,
    skip,
    take
  });
  // 총 개수
  const totalCount = await prisma.product.count();
  res.send({
    list: products,
    totalCount: totalCount
  });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where : { id }
  });
  if (!product) {
    return res.status(404).send({message: 'No product found with the given ID'});
  }
  res.send(product);
}));

router.post('/', asyncHandler(async(req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).send(product);
}));

router.patch('/:id', asyncHandler(async(req, res) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where : { id },
    data : req.body,
  });
  res.send(product);
}));

router.delete('/:id', asyncHandler(async(req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where : { id },
  });
  res.sendStatus(204);
}));



export default router;