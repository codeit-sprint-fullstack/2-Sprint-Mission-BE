import mongoose from "mongoose"
import data from "./mock.js";
import { DATABASE_URL } from './env.js';
import Product from "../models/product.js";
import * as dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany({});
await Product.insertMany(data);

mongoose.connection.close();