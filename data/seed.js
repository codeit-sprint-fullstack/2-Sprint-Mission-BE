import mongoose from "mongoose";
import mockData from "./mock.js";
import Product from "../models/Product.js";
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany({});
await Product.insertMany(mockData);

mongoose.connection.close();