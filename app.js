import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

//오류 처리
function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.log(e.name);
      console.log(e.message);
    }
  };
}

//상품등록 POST
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  })
);

//상품 상세 조회 GET:id
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).select(
      "name description price tags createdAt"
    );
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id. " });
    }
  })
);

//상품 수정 PATCH
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
      await product.save();
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id. " });
    }
  })
);

//상품 삭제 DELETE
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id. " });
    }
  })
);

//상품 목록 조회 GET
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const keyword = req.query.keyword || "";
    const keywordRegex = new RegExp(keyword, "i");

    const sort = req.query.sort || "recent";
    let sortOption = {};
    if (sort === "favoriteCount") {
      sortOption = { favoriteCount: "desc" };
    } else {
      sortOption = { createdAt: sort === "recent" ? "desc" : "asc" };
    }

    const products = await Product.find(
      {
        $or: [{ name: keywordRegex }, { description: keywordRegex }],
      },
      { name: 1, price: 1, favoriteCount: 1, createdAt: 1 }
    )
      .sort(sortOption)
      .skip(offset)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments({
      $or: [{ name: keywordRegex }, { description: keywordRegex }],
    });

    res.status(200).send({
      products,
    });
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
