import { prismaClient } from '../connection/postgres.connection.js';
import { ArticleRepo } from '../repo/article.repo.js';
import { ArticleService } from '../services/article.service.js';
import { ArticleController } from '../controllers/article.controller.js';

const articleModel = new ArticleRepo(prismaClient);
const articleService = new ArticleService(articleModel);
const articleController = new ArticleController(articleService);

export { articleController };
