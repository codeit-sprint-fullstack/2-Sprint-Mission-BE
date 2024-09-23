import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Product from "../models/Product.js";
import data from "./mock.js";

const DATABASE_URL = process.env.DATABASE_URL;

async function seedDatabase() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to DB"));

  await Product.deleteMany({});
  await Product.insertMany(data);

  mongoose.connection.close();
}

seedDatabase();
