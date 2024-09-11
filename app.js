import express from 'express';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('connected to DB'));

const app = express();  

const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'https://buffso-pandamarket.netlify.app/']
}
app.use(cors(corsOptions));
app.use(express.json());  // JSON 요청 파싱 미들웨어

// Content-Type 검사 미들웨어
app.use((req, res, next) => {
  // `PATCH`와 `POST` 요청에 대해 Content-Type을 검사
  if ((req.method === 'POST' || req.method === 'PATCH') && !req.is('application/json')) {
    return res.status(400).send({ message: 'Content-Type must be application/json' });
  }
  next();
});

function asyncHandler(handler) {
  // 함수를 인수로 받아서 함수를 반환한다.
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch(e) {
      if(e.name == 'ValidationError') {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: 'Cannot find given id.'});
      } else {
        res.status(500).send({message: e.message });
      }
    }
  }
}

app.get('/products', asyncHandler(async (req, res) => {
  // TODO: name, description 포함 검색을 몽고디비로
  // 오프셋 기반 페이지네이션을 구현하세요.
  // offset(이미 본 갯수), limit(앞으로 보고싶은 갯수)  
  const sort = req.query.sort;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const keyword = req.query.keyword || '';
  const sortOption = { createdAt: sort === 'recent' ? 'desc' : 'asc' };

  const searchQuery = {
    $or: [
      {name: {$regex: keyword, $options: 'i'}},    // 대소문자 없이 검색
      {description: {$regex: keyword, $options: 'i'}}
    ]
  }

  const offset = (page-1) * pageSize;       //오프셋 기반 페이지네이션 계산

  const products = await Product.find(searchQuery)
    .sort(sortOption)
    .skip(offset)
    .limit(pageSize);

  res.send(products);

}));

app.get('/products/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);    // findById는 쿼리를 리턴한다.

    res.send(product);
}));

app.post('/products', asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body)
  res.status(201).send(newProduct);
}));

app.patch('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID format.' });
  }

  const product = await Product.findById(id);  
  if(product) {
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    res.send(product);
  } else {
    res.status(404).send({ message: 'Cannot find given id.'});
  }
}));

app.delete('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);  
  if(product) {
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: 'Cannot find given id.'});
  }
}));

app.listen(process.env.PORT || 3000, () => console.log('Server Started...'));
