import express from "express";
import Product from "./models/Product.js";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
mongoose.connect(DATABASE_URL);
const app = express();
app.use(express.json());
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
    const sortOption = { createdAt: orderBy === "recent" ? "desc" : "asc" };
    const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
    const foundProduct = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.send(foundProduct);
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
app.listen(3000, () => console.log("Server Started"));
