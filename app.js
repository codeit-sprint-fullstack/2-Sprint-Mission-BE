import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { PrismaClient, Prisma } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from './structs.js';

const prisma = new PrismaClient();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://welcome-to-pandamarket.netlify.app'
  ]
};

app.use(express.json());
app.use(cors(corsOptions));

function asyncHandler(handler) {
  // 함수를 인수로 받아서 함수를 반환
  const asyncReqHandler = async function (req, res) {
    try {
      await handler(req, res);
    } catch (err) {
      if (
        err.name === 'StructError' ||
        err instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: err.message });
      } else if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).send({ message: 'Cannot find given id.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    }
  };
  return asyncReqHandler;
}

// 상품 등록
app.post(
  '/products',
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const newProduct = await prisma.product.create({
      data: req.body
    });
    res.status(201).json(newProduct);
  })
);

// 상품 상세 조회
app.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id }
    });
    res.json(product);
  })
);

// 상품 수정
app.patch(
  '/products/:id',
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const id = req.params.id;
    const product = await prisma.product.update({
      where: { id },
      data: req.body
    });
    res.json(product);
  })
);

// 상품 삭제
app.delete(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await prisma.product.delete({
      where: { id }
    });

    res.sendStatus(204);
  })
);

// 상품 목록 조회
app.get(
  '/products',
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = 'recent', keyword } = req.query;
    let orderBy;
    if (order === 'recent') {
      orderBy = { createdAt: 'desc' };
    }

    // const page = Number(req.query.page) || 1;
    // const pageSize = Number(req.query.pageSize);

    // offset = (page - 1) * pageSize;

    // const keywordRegex = new RegExp(keyword, 'i');

    const products = await prisma.product.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit)
    });
    res.json(products);
  })
);

app.listen(process.env.PORT, () => console.log('server on'));
