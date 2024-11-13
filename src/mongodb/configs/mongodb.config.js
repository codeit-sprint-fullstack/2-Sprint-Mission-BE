import * as dotenv from 'dotenv';

dotenv.config();

export const mongodbConnectionConfig = {
  host: process.env.MONGODB_HOST,
  database: process.env.MONGODB_DATABASE,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
};
