import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

const app = express();
const corsOptions = {
  origin: ["http://127.0.0.1:4000"], // 이후에 프론트엔드 주소 추가 필요
};

app.use(cors(corsOptions));
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: "Cannot find given id" });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// post api
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  })
);

// get specific api
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.findById(id);
    if (products) {
      res.send(products);
    } else {
      res.status(404).send({ message: "Cannot find the matched ID" });
    }
  })
);

//patch api
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.findById(id);
    if (products) {
      Object.keys(req.body).forEach((key) => {
        products[key] = req.body[key];
      });
      await products.save();
      res.send(products);
    } else {
      res.status(404).send({ message: "Cannot find the matched id" });
    }
  })
);

// delete api
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find the matched ID" });
    }
  })
);

// get list api
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "recent";

    const offset = (page - 1) * pageSize;

    //검색 조건 https://lts0606.tistory.com/568
    const searchCondition = {
      $or: [{ name: { $regex: search } }, { description: { $regex: search } }],
    };

    const sortCondition = sort === "recent" ? { createdAt: -1 } : {};

    const products = await Product.find(searchCondition)
      // .select(`name price createdAt`)
      .sort(sortCondition)
      .skip(offset)
      .limit(Number(pageSize));
    res.send(products);
  })
);

app.listen(process.env.PORT || 4000, () => console.log("Server Started"));
