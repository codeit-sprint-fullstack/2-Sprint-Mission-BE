import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";

const corsOptions = {
  origin: ["http://localhost:3000", "https://sprint-panda.netlify.app"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/products", productRoutes);
app.use("/articles", articleRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
