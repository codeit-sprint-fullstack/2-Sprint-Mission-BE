import { prismaClient } from '#connection/postgres.connection.js';
import { ArticleController } from '#controllers/article.controller.js';
import { ArticleRepository } from '#repositories/article.repository.js';
import { ArticleService } from '#services/article.service.js';

const articleModel = new ArticleRepository(prismaClient);
const articleService = new ArticleService(articleModel);
const articleController = new ArticleController(articleService);

export default articleController;
