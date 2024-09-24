import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { handleErrors } from './utils/globalErrorHandler.js';
import requestLogger from './utils/requestLogger.js';
import responseLogger from './utils/responseLogger.js';

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://welcome-to-pandamarket.netlify.app'
  ]
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(requestLogger);
app.use(responseLogger);

app.use('/products', productRoutes);
app.use('/articles', articleRoutes);

app.use(handleErrors);

app.listen(process.env.PORT, () => console.log('server on'));
