import * as dotenv from 'dotenv';

dotenv.config();

export const postgresConnectionConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  render: process.env.DATABASE_URL_render,
};
