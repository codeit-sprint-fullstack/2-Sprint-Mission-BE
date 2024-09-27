import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from './struct.js';
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", 'https://panda-market-react.netlify.app'],
};

app.use(cors(corsOptions));
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "StructError" || e instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({ message: e.message });
      } else if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        res.status(404).send({ message: "Cannot find given id." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

app.get("/products", 
  asyncHandler(async (req, res) => {
    const { page = 0, pageSize = 10, order = 'recent', search = '' } = req.query;
    
    const products = await prisma.product.findMany({
      skip: parseInt(page) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy: order === 'favorite' ? { favoriteCnt: 'desc' } : { createdAt: 'desc' },
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }
    });

    const totalCount = await prisma.product.count({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }
    });

    res.send({ data: products, totalCount: totalCount });
  })
);

app.get("/products/:id", 
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.post("/products", 
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({
      data: req.body,
    });

    res.status(201).send(product);
  })
);

app.patch("/products/:id", 
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });


    if(product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.delete("/products/:id", 
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.delet({
      where: { id },
    });

    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
