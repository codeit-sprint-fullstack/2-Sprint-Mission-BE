import { prismaClient } from '../db/postgres.connection.js';
import { ArticleModel } from '../models/article.model.js';
import { ArticleService } from '../services/article.service.js';
import { ArticleController } from '../controllers/article.controller.js';

const articleModel = new ArticleModel(prismaClient);
const articleService = new ArticleService(articleModel);
const articleController = new ArticleController(articleService);

export { articleController };
