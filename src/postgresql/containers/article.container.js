import { prismaClient } from '../connection/postgres.connection.js';
import { ArticleDB } from '../db/article.db.js';
import { ArticleService } from '../services/article.service.js';
import { ArticleController } from '../controllers/article.controller.js';

const articleModel = new ArticleDB(prismaClient);
const articleService = new ArticleService(articleModel);
const articleController = new ArticleController(articleService);

export { articleController };
