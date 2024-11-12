import express from "express";
import productRouter from "./routes/productRouter";

const app = express();

app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server Started!");
});
