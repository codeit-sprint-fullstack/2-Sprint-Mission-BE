import { assert } from 'superstruct';
import { TypeError } from '../utils/error.js';
import { CreateArticle, PatchArticle, Uuid } from '../../struct.js';
import { MESSAGES } from '../../constants.js';

export class ArticleController {
  constructor(articleService) {
    this.service = articleService;
  }

  getArticles = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    if (isNaN(page) || isNaN(pageSize)) {
      throw new TypeError('page and pageSize should be an integer');
    }

    res.status(200).json(
      await this.service.getArticlesAndCount({
        orderBy,
        page,
        pageSize,
        keyword,
      })
    );
  };

  getArticleById = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const article = await this.service.getArticleById(id);

    if (article) res.json(article);
    else res.status(404).json({ message: MESSAGES.NOID });
  };

  postArticle = async (req, res) => {
    assert(req.body, CreateArticle);
    const newArticle = await this.service.postArticle(req.body);

    res.status(201).json(newArticle);
  };

  patchArticleById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchArticle);
    const id = req.params.id;

    const product = await this.service.patchArticleById(id, req.body);

    if (product) res.json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };

  deleteArticleById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.service.deleteArticleById(id);

    if (product) res.status(200).json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };
}
