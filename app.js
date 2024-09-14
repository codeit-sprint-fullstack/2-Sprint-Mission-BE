import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import Item from "./models/Product.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://codeit-pandamarket-by-ggon.netlify.app",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

const NOTFINDID = "Cannot find given id.";

function asyncHandler(handler) {
  const newHandler = async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: NOTFINDID });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
  return newHandler;
}

app.get(
  "/items",
  asyncHandler(async (req, res) => {
    const orderBy = req.query.orderBy || "recent";
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword;
    const offset = (page - 1) * pageSize;

    const sortOption = { createdAt: orderBy === "recent" ? "desc" : "asc" };
    const searchQuery = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const items = await Item.find(searchQuery)
      .sort(sortOption)
      .skip(offset)
      .limit(pageSize)
      .select("id name price createdAt tags");

    const totalItems = await Item.countDocuments(searchQuery);

    const response = { list: items, totalCount: totalItems };

    res.send(response);
  })
);

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
      res.status(404).send({ message: NOTFINDID });
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
      res.status(404).send({ message: NOTFINDID });
    }
  })
);

app.delete(
  "/item/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await item.findByIdAndDelete(id);
    if (item) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: NOTFINDID });
    }
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
