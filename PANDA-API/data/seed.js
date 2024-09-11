import mongoose from "mongoose";
import data from './mock.js';
import Item from "../models/Product.js";
import { DATABASE_URL } from "../env.js";

mongoose.connect(DATABASE_URL);

await Item.deleteMany({});
await Item.insertMany(data);

mongoose.connection.close();