import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//상품 상세 조회 GET:id
app.get('/users', async (req, res) => {
  const { offset = 0, limit = 10, order = 'newest' } = req.query;
  let orderBy; 
  switch (order) {
    case 'oldest':
      orderBy = { createdAt: 'asc' }; 
      break;
   case 'newest':
   default: 
      orderBy = { createdAt: 'desc' };
  }
  const users = await prisma.user.findMany({
    orderBy,
    skip: parseInt(offset), 
    take: parseInt(limit),
  });
  res.send(users);
});

//상품 목록 조회 GET
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

//상품등록 POST
app.post('/users', async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(201).send(user);
});

//상품 수정 PATCH
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params; 
  const user = await prisma.user.updata({
    where: { id },
    data: req.body, 
  })
  res.send(user);
});

//상품 삭제 DELETE
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const prisma.user.delete({
    where: { id },
  })
  res.sendStatus(204);
});
