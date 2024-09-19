import mongoose from 'mongoose';
import Product from '../models/Product.js';
import data from './mock.js';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany();
await Product.insertMany(data);

mongoose.connection.close();