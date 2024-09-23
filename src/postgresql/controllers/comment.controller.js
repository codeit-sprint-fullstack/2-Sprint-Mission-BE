import { assert } from 'superstruct';
import { CreateComment, Cursor, PatchComment, Uuid } from '../../struct.js';
import { MESSAGES } from '../../constants.js';
import { TypeError } from '../../error.js';

export class CommentController {
  constructor(commentService) {
    this.service = commentService;
  }

  getCommentsDev = async (req, res) => {
    res.json(await this.service.getComments());
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

    const resBody = await this.service.getPaginatedComments({
      id: articleId,
      limit,
      cursor,
      type: 'article',
    });

    res.status(200).json(resBody);
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

    const resBody = await this.service.getPaginatedComments({
      id: productId,
      limit,
      cursor,
      type: 'product',
    });

    res.status(200).json(resBody);
  };

  postCommentOfArticle = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);
    const articleId = req.params.id;

    const comment = await this.service.postComment({
      ...req.body,
      articleId,
    });
    res.status(201).json(comment);
  };

  postCommentOfProduct = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);
    const productId = req.params.id;

    const comment = await this.service.postComment({
      ...req.body,
      productId,
    });

    res.status(201).json(comment);
  };

  patchCommentById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchComment);
    const id = req.params.id;

    const comment = await this.service.patchComment(id, req.body);

    if (!comment) res.status(404).json({ message: MESSAGES.NOID });

    res.json(comment);
  };

  deleteCommentById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const comment = await this.service.deleteComment(id);

    if (!comment) res.status(404).json({ message: MESSAGES.NOID });

    res.json(comment);
  };
}
