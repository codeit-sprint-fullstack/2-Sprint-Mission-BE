import { assert } from 'superstruct';
import { TypeError } from '../utils/error.js';
import { CreateComment, Cursor, PatchComment, Uuid } from '../../struct.js';
import { MESSAGES } from '../../constants.js';

export class CommentController {
  constructor(commentService) {
    this.service = commentService;
  }

  getCommentsDev = async (req, res) => {
    res.status(200).json(await this.service.getComments());
  };

  getCommentsOfArticle = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.query.cursor, Cursor, MESSAGES.IDFORMAT);
    const articleId = req.params.id;
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    if (isNaN(limit)) {
      throw new TypeError('limit should be an integer');
    }

    res.status(200).json(
      await this.service.getCommentsAndCursor({
        id: articleId,
        limit,
        cursor,
        type: 'article',
      })
    );
  };

  getCommentsOfProduct = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.query.cursor, Cursor, MESSAGES.IDFORMAT);
    const productId = req.params.id;
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    if (isNaN(limit)) {
      throw new TypeError('limit should be an integer');
    }

    res.status(200).json(
      await this.service.getCommentsAndCursor({
        id: productId,
        limit,
        cursor,
        type: 'product',
      })
    );
  };

  postCommentOfArticle = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);

    const articleId = req.params.id;

    res.status(201).json(
      await this.service.postComment({
        ...req.body,
        articleId,
      })
    );
  };

  postCommentOfProduct = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);

    const productId = req.params.id;

    res.status(201).json(
      await this.service.postComment({
        ...req.body,
        productId,
      })
    );
  };

  patchCommentById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchComment);
    const id = req.params.id;

    const product = await this.service.patchCommentById(id, req.body);

    if (product) res.json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };

  deleteCommentById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.service.deleteCommentById(id);

    if (product) res.status(200).json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };
}
