export class CommentService {
  constructor(commentDB) {
    this.db = commentDB;
  }

  getComments = async () => {
    const comments = await this.db.findMany();

    return comments;
  };

  getPaginatedComments = async ({ id, limit, cursor, type }) => {
    const resBody = await this.db.findManyAndCursor({
      id,
      limit,
      cursor,
      type,
    });

    return resBody;
  };

  postComment = async (body) => {
    const comment = await this.db.create(body);

    return comment;
  };

  patchComment = async (id, body) => {
    const comment = await this.db.findById(id);
    if (!comment) return;

    Object.keys(body).forEach((k) => {
      comment[k] = body[k];
    });

    const updated = await this.db.update(id, comment);

    return updated;
  };

  deleteComment = async (id) => {
    const comment = await this.db.deleteById(id);

    return comment;
  };
}
