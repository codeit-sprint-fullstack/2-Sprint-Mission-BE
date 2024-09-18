export class CommentService {
  constructor(commentModel) {
    this.model = commentModel;
  }

  getComments = async () => {
    return await this.model.findMany();
  };

  getCommentsAndCursor = async ({ id, limit, cursor, type }) => {
    return await this.model.findManyAndCursor({ id, limit, cursor, type });
  };

  postComment = async (body) => {
    return await this.model.create(body);
  };

  patchCommentById = async (id, body) => {
    let product = await this.model.findById(id);
    if (!product) return;

    Object.keys(body).forEach((k) => {
      product[k] = body[k];
    });
    return await this.model.update(id, product);
  };

  deleteCommentById = async (id) => {
    return await this.model.deleteById(id);
  };
}
