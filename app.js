import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import { DATABASE_URL } from "./env.js";

mongoose.connect(DATABASE_URL).then(() => console.log("Connected to DB"));

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("server on"));
