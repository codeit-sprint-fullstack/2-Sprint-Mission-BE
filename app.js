import express from "express";
import Product from "./models/Product.js";
import mongoose from "mongoose";
import config from "./config.js";
import cors from "cors";

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB에 성공적으로 연결되었습니다.");
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패:", error);
  });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = config.port || 3000;
const PRODUCT_NOT_FOUND_MESSAGE = "Cannot find given id.";
const asyncHandler = (handler) => {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: PRODUCT_NOT_FOUND_MESSAGE });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
};
const changeTypeNumber = ({ page = 1, pageSize = 8 }) => {
  page = Number(page);
  pageSize = Number(pageSize);
  return {
    page,
    pageSize
  };
};
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page, pageSize } = changeTypeNumber(req.query);
    const { orderBy, keyword } = req.query;
    const sortOption = { createdAt: orderBy === "recent" ? -1 : 1 };
    const searchQuery = keyword
      ? { name: { $regex: keyword, $options: "i" } }
      : {};
    const totalCount = await Product.countDocuments(searchQuery);
    const list = await Product.find(searchQuery)
      .sort(sortOption)
      .skip((page - 1) * pageSize) // 페이지네이션을 위한 skip
      .limit(pageSize);
    res.send({
      totalCount,
      list
    });
  })
);
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const foundProduct = await Product.findById(id);
    if (foundProduct) {
      res.send(foundProduct);
    } else {
      res.status(404).send({ message: PRODUCT_NOT_FOUND_MESSAGE });
    }
  })
);
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const editProduct = await Product.findById(id);
    if (editProduct) {
      Object.keys(req.body).forEach(
        (key) => (editProduct[key] = req.body[key])
      );
      await editProduct.save();
      res.send(editProduct);
    } else {
      res.status(404).send({ message: PRODUCT_NOT_FOUND_MESSAGE });
    }
  })
);
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: PRODUCT_NOT_FOUND_MESSAGE });
    }
  })
);
app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행중입니다.`));
