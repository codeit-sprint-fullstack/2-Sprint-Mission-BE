import dotenv from "dotenv";
dotenv.config();
const config = {
  mongoUrl: process.env.MONGODB_URL,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV
};
export default config;
