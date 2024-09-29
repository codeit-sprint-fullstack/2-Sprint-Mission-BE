import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://sprint-panda.netlify.app"],
};

app.use("/products", productRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
