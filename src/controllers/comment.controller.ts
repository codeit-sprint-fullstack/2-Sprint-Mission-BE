import { assert } from 'superstruct';
import { CommentService } from '#services/comment.service.js';
import { CommentType } from '#types/options.type.js';
import { RequestHandler } from '#types/request.type.js';
import HTTP_CODES from '#utils/constants/http-codes.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateComment, Cursor, PatchComment, PutComment, Uuid } from '#utils/struct.js';

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  getCommentsDev: RequestHandler = async (req, res) => {
    res.json(await this.commentService.getComments());
  };

  getCommentsOfArticle: RequestHandler<{
    params: { id: string };
    query: { cursor: string; limit: string };
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.query.cursor, Cursor, MESSAGES.IDFORMAT);

    const articleId = req.params.id;
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    const resBody = await this.commentService.getPaginatedComments({
      id: articleId,
      limit,
      cursor,
      type: CommentType.Article,
    });

    res.status(HTTP_CODES.OK).json(resBody);
  };

  getCommentsOfProduct: RequestHandler<{
    params: { id: string };
    query: { cursor: string; limit: string };
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.query.cursor, Cursor, MESSAGES.IDFORMAT);

    const productId = req.params.id;
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    const resBody = await this.commentService.getPaginatedComments({
      id: productId,
      limit,
      cursor,
      type: CommentType.Product,
    });

    res.status(HTTP_CODES.OK).json(resBody);
  };

  postCommentOfArticle: RequestHandler<{
    params: { id: string };
    body: { content: string; ownerId: string };
    query: { cursor: string; limit: string };
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);
    const articleId = req.params.id;

    const comment = await this.commentService.postComment({
      ...req.body,
      articleId,
      productId: null,
    });

    res.status(HTTP_CODES.CREATED).json(comment);
  };

  postCommentOfProduct: RequestHandler<{
    params: { id: string };
    body: { content: string; ownerId: string };
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);
    const productId = req.params.id;

    const comment = await this.commentService.postComment({
      ...req.body,
      productId,
      articleId: null,
    });

    res.status(HTTP_CODES.CREATED).json(comment);
  };

  patchComment: RequestHandler<{
    params: { id: string };
    body: { content: string };
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchComment);
    const id = req.params.id;

    const comment = await this.commentService.patchComment(id, req.body);

    res.json(comment);
  };

  putComment: RequestHandler<{
    params: { id: string };
    body: { content: string; ownerId: string; articleId: string | null; productId: string | null };
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PutComment);
    const id = req.params.id;

    const comment = await this.commentService.putComment(id, req.body);

    res.json(comment);
  };

  deleteComment: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const comment = await this.commentService.deleteComment(id);

    res.json(comment);
  };
}
