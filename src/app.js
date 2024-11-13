import { Prisma } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { StructError } from 'superstruct';
import c from './constants.js';
import { CastError, TypeError, ValidationError } from './error.js';
import articleRouter from './routes/articles.route.js';
import commentRouter from './routes/comments.route.js';
import devRouter from './routes/dev.route.js';
import productRouter from './routes/products.route.js';

const app = express();
app.use(cors());
app.use(express.json());

function validation(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const limit = req.query.limit;

  if (page && isNaN(Number(page))) throw new TypeError('page should be an integer');
  if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize should be an integer');
  if (limit && isNaN(Number(limit))) throw new TypeError('limit should be an integer');

  next();
}

app.use(validation);

/***************************    ROUTES    **************************************************/
app.use('/dev', devRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

/***************************    HANDLER    **************************************************/
function errorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof Prisma.PrismaClientValidationError || err instanceof TypeError || err instanceof ValidationError) {
    res.status(c.HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
  } else if (
    err instanceof StructError ||
    (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') ||
    err instanceof CastError
  ) {
    res.sendStatus(c.HTTP_STATUS.NOT_FOUND);
  } else {
    res.status(c.HTTP_STATUS.SERVER_ERROR).send({ message: err.message });
  }
}

app.use(errorHandler);

const startServer = async () => {
  try {
    // 기본 포트(3000)로 시도
    await new Promise((resolve, reject) => {
      const server = app.listen(process.env.PORT, () => {
        console.log(`Server Started on port ${process.env.PORT}`);
        resolve();
      });

      server.on('error', err => {
        if (err.code === 'EADDRINUSE') {
          // 기본 포트가 사용 중이면 reject
          reject(err);
        }
      });
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      // 3000번 포트가 사용 중이면 3001로 시도
      app.listen(3001, () => {
        console.log('Server Started on port 3001 (fallback)');
      });
    } else {
      console.error('Failed to start server:', error);
    }
  }
};
startServer();
