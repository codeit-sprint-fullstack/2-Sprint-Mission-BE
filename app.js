import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import { DATABASE_URL } from "./env.js";

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));

const app = express();

app.use(express.json());

function asyncHandler(handler) {
  const asyncHandler = async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.stats(404).send({ message: "Cannot find given id." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
  return asyncHandler;
}

app.listen(3000, () => console.log("server on"));
