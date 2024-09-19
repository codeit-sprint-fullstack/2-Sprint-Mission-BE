import mongoose from "mongoose";
import data from "./mock.js";
import Product from "../models/Product.js";
import config from "../config.js";

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB에 성공적으로 연결되었습니다.");
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패:", error);
  });
await Product.deleteMany({});
await Product.insertMany(data);
mongoose.connection.close();
