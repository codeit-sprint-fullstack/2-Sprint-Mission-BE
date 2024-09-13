import mongoose from "mongoose";
import data from './mock.js';
import Task from '../models/Task.js';
import { DATABASE_URL } from "../env.js";

mongoose.connect(DATABASE_URL); // Open

await Task.deleteMany({});
await Task.insertMany(data);

mongoose.connection.close(); // Close
