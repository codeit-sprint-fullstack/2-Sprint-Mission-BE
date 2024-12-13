import express from 'express';
import articleRouter from '#routes/articles.route.js';
import authRouter from '#routes/auth.route.js';
import commentRouter from '#routes/comments.route.js';
import devRouter from '#routes/dev.route.js';
import productRouter from '#routes/products.route.js';

export default function setupRoutes(app: express.Application) {
  app.use('/dev', devRouter);
  app.use('/auth', authRouter);
  app.use('/products', productRouter);
  app.use('/articles', articleRouter);
  app.use('/comments', commentRouter);

  app.get('/hello', (req, res) => {
    res.send('Hello World');
  });
}
