import { Injectable } from "@nestjs/common";
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
  
  async get({ cursor }) {
    const cur = cursor ? { id: cursor } : undefined;
    const take = cursor ? 10 : undefined;
    const skip = cursor ? 1 : 0;
    return this.commentRepository.get({ cur, take, skip });
  }

  async getProduct({ productId, cursor }) {
    const cur = cursor ? { id: cursor } : undefined;
    const take = 10;
    const skip = cursor ? 1 : 0;
    return this.commentRepository.getProduct({ productId, cur, take, skip });
  }

  async getArticle({ articleId, cursor }) {
    const cur = cursor ? { id: cursor } : undefined;
    const take = 10;
    const skip = cursor ? 1 : 0;
    return this.commentRepository.getArticle({ articleId, cur, take, skip });
  }

  async getById(id: string, cursor: string) {
    return this.commentRepository.getById(id);
  }

  async create(data) {
    return this.commentRepository.save(data);
  }

  async update(id: string, data) {
    return this.commentRepository.update(id, data);
  }

  async remove(id: string) {
    return this.commentRepository.remove(id);
  }
}