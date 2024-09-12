import mongoose from 'mongoose';
import data from './mock.js';
import Product from '../models/Product.js';
import * as dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany({}); // 인자로 삭제 조건을 전달
await Product.insertMany(data); // 인자로 삽입할 데이터를 전달

mongoose.connection.close();
