export class CommentService {
  constructor(commentRepo) {
    this.repo = commentRepo;
  }

  getComments = async () => {
    const comments = await this.repo.findMany();

    return comments;
  };

  getPaginatedComments = async ({ id, limit, cursor, type }) => {
    const resBody = await this.repo.findManyAndCursor({
      id,
      limit,
      cursor,
      type,
    });

    return resBody;
  };

  postComment = async body => {
    const comment = await this.repo.create(body);

    return comment;
  };

  patchComment = async (id, body) => {
    const comment = await this.repo.findById(id);
    if (!comment) return;

    Object.keys(body).forEach(k => {
      comment[k] = body[k];
    });

    const updated = await this.repo.update(id, comment);

    return updated;
  };

  putComment = async (id, body) => {
    const comment = await this.repo.findById(id);
    if (!comment) return;

    const updated = await this.repo.update(id, body);

    return updated;
  };

  deleteComment = async id => {
    const comment = await this.repo.deleteById(id);

    return comment;
  };
}
