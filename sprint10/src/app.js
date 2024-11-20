import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userController from "./controllers/userController.js";
import productController from "./controllers/productController.js";
import articleController from "./controllers/articleController.js";
import errorHandler from "./middlewares/errorHandler.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors({
	origin: 'http://localhost:3000', // Front-End 단 주소.
	credentials: true // 쿠키를 받기 위한 설정.
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/account', userController);
app.use('/products', productController);
app.use('/articles', articleController);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on port: ${port}`));
