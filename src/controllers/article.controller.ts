import { assert } from 'superstruct';
import { ArticleService } from '#services/article.service.js';
import { ArticleDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';
import { RequestHandler } from '#types/request.type.js';
import HTTP_CODES from '#utils/constants/http-codes.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateArticle, PatchArticle, Uuid } from '#utils/struct.js';

export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  getArticles: RequestHandler<{ query: FindOptions }> = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const resBody = await this.articleService.getPaginatedArticles({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.status(HTTP_CODES.OK).json(resBody);
  };

  getArticleById: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const article = await this.articleService.getArticle(id);

    res.json(article);
  };

  postArticle: RequestHandler<{ body: ArticleDTO }> = async (req, res) => {
    assert(req.body, CreateArticle);

    const article = await this.articleService.postArticle(req.body);

    res.status(HTTP_CODES.CREATED).json(article);
  };

  patchArticle: RequestHandler<{ params: { id: string }; body: ArticleDTO }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchArticle);
    const id = req.params.id;

    const article = await this.articleService.patchArticle(id, req.body);

    res.json(article);
  };

  deleteArticle: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const article = await this.articleService.deleteArticle(id);

    res.json(article);
  };

  postArticleLike: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const articleId = req.params.id;
    const userId = '';
    const article = await this.articleService.postArticleLike(articleId, userId);

    res.json(article);
  };

  deleteArticleLike: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const articleId = req.params.id;
    const userId = '';
    const article = await this.articleService.deleteArticleLike(articleId, userId);

    res.json(article);
  };
}
