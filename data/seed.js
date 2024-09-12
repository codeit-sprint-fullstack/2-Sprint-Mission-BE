import mongoose from 'mongoose';
import Task from '../models/Task.js';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Task.deleteMany({});
await Task.insertMany();

mongoose.connection.close();
