import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import Product from './Models/Product.js';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected to DB"));

const app = express();
// const corsOptions = {
//   origin: [프론트엔드 서버, 배포 서버],
// }; 배포 후 추가하고 app.use(cors(corsOptions))로 수정
app.use(cors());
app.use(express.json());

function asyncHandler(handler) {
  const newHandler = async function(req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({message: e.message});
      } else if (e.name === 'CastError') {
        res.status(404).send({message: '해당 데이터를 찾을 수 없습니다!'});
      } else {
        res.status(500).send({message: e.message});
      }
    }
  }
  return newHandler;
}

app.get("/products", asyncHandler(async (req, res) => {
  const count = Number(req.query.count) || 0;
  const products = await Product.find().sort({createdAt: 'desc'}).limit(count);
  res.send(products);
}));

app.get("/products/:id", asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({message: '해당 데이터를 찾을 수 없습니다!'});
  }
}))
app.post("/products", asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.send(newProduct);
}))

app.patch('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    res.send(product);
  } else {
    res.status(404).send({message: '해당 데이터를 찾을 수 없습니다!'});
  }
}))

app.delete("/products/:id", asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);

  if (product) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404).send({message: '해당 데이터를 찾을 수 없습니다!'})
  }
}))

app.listen(process.env.PORT || 3000, () => console.log("Server on"));
