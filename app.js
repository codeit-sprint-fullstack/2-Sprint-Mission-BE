import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import Product from './models/Product.js';
import cors from 'cors';

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to DB'));

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
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else if (err.name === 'CastError') {
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
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      id: newProduct.id,
      ...newProduct.toJSON()
    });
  })
);

// 상품 상세 조회
app.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id, { updatedAt: 0 });

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: '해당 상품을 찾을 수 없습니다.' });
    }
  })
);

// 상품 수정
app.patch(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
      await product.save();
      res.send(product);
    } else {
      res.status(404).send({ message: '해당 상품을 찾을 수 없습니다.' });
    }
  })
);

// 상품 삭제
app.delete(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: '해당 상품을 찾을 수 없습니다.' });
    }
  })
);

// 상품 목록 조회
app.get(
  '/products',
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize);

    const offset = (page - 1) * pageSize;

    const keyword = req.query.keyword || '';
    const keywordRegex = new RegExp(keyword, 'i');

    const order = req.query.order;
    const orderOption = { createdAt: order === 'recent' ? 'desc' : 'asc' };

    const products = await Product.find(
      { $or: [{ name: keywordRegex }, { description: keywordRegex }] }, // 검색 조건
      { name: 1, price: 1, favoriteCount: 1, createdAt: 1 }
    )
      .sort(orderOption)
      .skip(offset)
      .limit(pageSize);
    res.send(products);
  })
);

app.listen(process.env.PORT, () => console.log('server on'));
