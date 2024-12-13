import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { runAsyncLocalStorage } from '#middlewares/asyncLocalStorage.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';

const upload = multer({ dest: 'uploads/' });

export default function setupMiddlewares(app: express.Application) {
  app.use(runAsyncLocalStorage);
  app.use(cors({ credentials: true, origin: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(upload.single('file'));
  app.use('/files', express.static('uploads'));
  app.use(validatePaginationOptions);

  app.use((req, res, next) => {
    console.log(`Request Path: ${req.path}`);
    console.log(`Request Method: ${req.method}`);
    next();
  });
}
