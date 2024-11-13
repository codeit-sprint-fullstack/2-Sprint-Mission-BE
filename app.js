import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import Product from './models/Product.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to DB'));
app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

const MESSAGES = Object.freeze({
  NOID: 'Cannot find given id.',
  IDFORMAT: 'Invalid id format.'
});

// handler를 인자로 받아서 오류처리 해주는 함수
function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: MESSAGES.IDFORMAT });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// get API
app.get(
  '/products',
  asyncHandler(async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword;

    const sortOption = { createdAt: orderBy === 'recent' ? 'asc' : 'desc' };
    const searchOption = keyword ? { $text: { $search: keyword } } : {};

    const query = Product.find(searchOption);
    const count = await query.clone().countDocuments();
    const products = await query
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const response = { list: products, totalCount: count };

    res.send(response);
  })
);

// get :id API
app.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) res.send(product);
    else res.status(404).send({ message: MESSAGES.NOID });
  })
);

// post API
app.post(
  '/products',
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.status(201).send(newProduct);
  })
);

// patch API
app.patch(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      Object.keys(req.body).forEach((k) => {
        product[k] = req.body[k];
      });
      await product.save();
      res.send(product);
    } else res.status(404).send({ message: MESSAGES.NOID });
  })
);

// delete API
app.delete(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.sendStatus(204);
    } else res.status(404).send({ message: MESSAGES.NOID });
  })
);
