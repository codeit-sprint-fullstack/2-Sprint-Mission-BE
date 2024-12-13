import { CommentRepository } from '#repositories/comment.repository.js';
import { CommentDTO } from '#types/dtos.type.js';
import { CommentFindOptions } from '#types/options.type.js';
import assertExist from '#utils/assertExist.js';

export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  getComments = async () => {
    const comments = await this.commentRepository.findMany();

    return comments;
  };

  getPaginatedComments = async ({ id, limit, cursor, type }: CommentFindOptions) => {
    const resBody = await this.commentRepository.findManyAndCursor({
      id,
      limit,
      cursor,
      type,
    });

    return resBody;
  };

  postComment = async (body: CommentDTO) => {
    const comment = await this.commentRepository.create(body);

    return comment;
  };

  patchComment = async (id: string, body: { content: string }) => {
    const target = await this.commentRepository.findById(id);
    assertExist(target);

    const comment = await this.commentRepository.update(id, body);

    return comment;
  };

  putComment = async (id: string, body: CommentDTO) => {
    const target = await this.commentRepository.findById(id);
    assertExist(target);

    const comment = await this.commentRepository.update(id, body);

    return comment;
  };

  deleteComment = async (id: string) => {
    const target = await this.commentRepository.findById(id);
    assertExist(target);

    const comment = await this.commentRepository.deleteById(id);

    return comment;
  };
}
