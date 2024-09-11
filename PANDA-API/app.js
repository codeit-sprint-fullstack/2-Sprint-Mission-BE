import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import Item from "./models/Product.js";

const app = express();
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
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;

    const sortOption = { createdAt: sort === "recent" ? "desc" : "asc" };
    const items = await Item.find().sort(sortOption).limit(count);

    res.send(items);
  })
);

app.get(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
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

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));

app.listen(3000, () => console.log("Server Started"));
//포트번호는 컴퓨터 내에서 실행되는 프로세스를 구분짓기 위한 번호.
