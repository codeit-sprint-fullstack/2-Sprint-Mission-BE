import express from 'express';
import 'express-async-errors';
import setupMiddlewares from '@/src/app.middlewares.js';
import setupRoutes from '@/src/app.routes.js';
import errorHandler from './middlewares/error-handler.js';

export const app = express();

setupMiddlewares(app);
setupRoutes(app);
app.use(errorHandler);

const startServer = async () => {
  try {
    // 기본 포트(3000)로 시도
    await new Promise((resolve, reject) => {
      const server = app.listen(process.env.PORT, () => {
        console.log(`Server Started on port ${process.env.PORT}`);
        resolve(null);
      });

      server.on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          // 기본 포트가 사용 중이면 reject
          reject(err);
        }
      });
    });
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'EADDRINUSE') {
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
