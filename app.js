import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

import Product from "./models/Products.js";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e)); //.env 연결 및 실패

const app = express(); // JSON 요청 파싱

app.use(express.json());
//app.use(cors()); //나중에 corsOption 줄 예정

function asyncHandler(handler) {
  //에러 처리 및 상태코드
  const newHandler = async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: "Cannot find given id." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
  return newHandler;
}

//상품 등록 API (post)

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const { name, description, price, tags } = req.body;
    if (!name || !description || !price || !tags) {
      return res.status(400).send({ message: "모든 필드를 입력해주세요." }); //models/Products.js에서
    }
    const product = new Product({
      name,
      description,
      price,
      tags,
    });

    await product.save();
    res.status(201).send(product); //성공 시 상품 등록하기
  })
);

//상품 상세 조회 API (get)

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "상품이 없습니다." }); //찾는 상품 없을 때
    }
    res.status(200).send(product); // 잘 찾았을 떄
  })
);

//상품 수정 API (PATCH)

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { name, description, price, tags } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "상품을 찾을 수 없습니다." });
    }

    res.status(200).send(updatedProduct);
  })
);

//상품 삭제 API

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "상품이 없습니다." });
    }
    res.status(200).send({ message: "상품이 삭제되었습니다.", product });
  })
);

//상품 목록 조회 API

app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sort = "recent", search } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // name 검색 regex(정규표현식) i는 대소문자 구분x
        { description: { $regex: search, $options: "i" } }, // description 검색
      ];
    }

    //정렬
    const sortOption = sort === "recent" ? { createdAt: -1 } : {}; //-1은 내림차순 정렬(시간은 큰 값 -> 작은 값)

    // 페이지네이션
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(offset)
      .limit(parseInt(limit));

    // 총 상품 개수 조회
    const totalProducts = await Product.countDocuments(query);

    res.status(200).send({
      totalProducts,
      page: parseInt(page),
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      products,
    });
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started")); //서버 시작
