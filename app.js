import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';

const app = express();
app.use(express.json());       // JSON 요청 파싱 미들웨어

const corsOptions = {
  //origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://buffso-pandamarket.netlify.app']
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:3001', 'http://localhost:3001', 'https://buffso-pandamarket.netlify.app']
}
app.use(cors(corsOptions));

// Content-Type 검사 미들웨어
app.use((req, res, next) => {
  // `PATCH`와 `POST` 요청에 대해 Content-Type을 검사
  if ((req.method === 'POST' || req.method === 'PATCH') && !req.is('application/json')) {
    return res.status(400).send({ message: 'Content-Type must be application/json' });
  }
  next();
});

app.use('/products', productsRoute);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
