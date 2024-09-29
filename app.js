import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import productsRoute from "./routes/productsRoute.js";
import articlesRoute from "./routes/articlesRoute.js";
import articleCommentsRoute from "./routes/articleCommentsRoute.js";
import productCommentsRoute from "./routes/productCommentsRoute.js";

const app = express();
app.use(express.json());
dotenv.config();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://pandamarket-by-goni.netlify.app/",
  ],
};
app.use(cors(corsOptions));

app.use("/products", productsRoute);
app.use("/products", productCommentsRoute);
app.use("/articles", articlesRoute);
app.use("/articles", articleCommentsRoute);

app.use((_, res) => {
  res.status(404).send({
    message: "The resource you are looking for does not exist",
  });
});

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
