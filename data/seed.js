import mongoose from "mongoose";
import data from "./mock.js";
import Item from "../models/Product.js";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Item.deleteMany({});
await Item.insertMany(data);

mongoose.connection.close();