import express from "express";
import mongoose from "mongoose";
import Item from "./models/Product.js";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://codeit-sprint-mission1.netlify.app",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
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
        res.status(404).send({ message: "아이디를 찾을 수 없습니다." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

app.get(
  "/items",
  asyncHandler(async (req, res) => {
    //쿼리 파라미터
    const { page = 1, limit = 10, sort = "recent", search = "" } = req.query;
    //페이지 네이션 offset 계산
    const offset = (page - 1) * limit;

    // 검색 조건 설정(name, disciption에 serch단어가 포함된 경우)
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            //regex : 정규식 패턴 조건, options: i => 대소문자 구분없이
          ],
        }
      : {};

    //정렬조건 설정(최신순이면 createdAt 기준 내림차순 정렬)
    const sortOption = { createdAt: sort === "recent" ? -1 : 1 };

    //상품 목록 조회 (페이지 네이션, 검색, 정렬 적용)
    const items = await Item.find(searchQuery)
      .sort(sortOption) // 정렬 적용
      .skip(offset) // offset 방식으로 페이지네이션
      .limit(Number(limit)) // 한 번에 가져올 상품 수 제한
      .select("id name price createdAt tags"); // 선택한 필드만 조회
    //전체 상품 수 계산 (검색 조건 적용)
    const totalItems = await Item.countDocuments(searchQuery);

    res.send({
      totalItems, //전체상품수
      page: Number(page), // 현재 페이지
      limit: Number(limit), // 한페이지에 표시할 상품 수
      items, // 조회된 상품 목록
    });
  })
);

//상품 상세 조회 API
app.get(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id).select(
      "name description price tags createdAt"
    );
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ message: "아이디를 찾을 수 없습니다." });
    }
  })
);

app.post(
  "/items",
  asyncHandler(async (req, res) => {
    const newItem = await Item.create(req.body);
    res.status(201).send(newItem);
  })
);

app.patch(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (item) {
      Object.keys(req.body).forEach((key) => {
        item[key] = req.body[key];
      });
      await item.save();
      res.send(item);
    } else {
      res.status(404).send({ message: "아이디를 찾을 수 없습니다." });
    }
  })
);

app.delete(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id);
    if (item) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "아이디를 찾을 수 없습니다." });
    }
  })
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
//포트번호는 컴퓨터 내에서 실행되는 프로세스를 구분짓기 위한 번호.
