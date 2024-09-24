import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import articleRoutes from "./routes/articleRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(express.json());

/**********Article***********/
app.use("/articles", articleRoutes);

/**********Product***********/
app.use("/products", productRoutes);

/**********ArticleComment***********/
app.use("/", commentRoutes);
/**********ProductComment***********/
app.use("/", commentRoutes);

app.listen(process.env.PORT || 3000, () => console.log("server started"));
