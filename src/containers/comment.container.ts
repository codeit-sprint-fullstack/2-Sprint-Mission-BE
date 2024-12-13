import { prismaClient } from '#connection/postgres.connection.js';
import { CommentController } from '#controllers/comment.controller.js';
import { CommentRepository } from '#repositories/comment.repository.js';
import { CommentService } from '#services/comment.service.js';

const commentModel = new CommentRepository(prismaClient);
const commentService = new CommentService(commentModel);
const commentController = new CommentController(commentService);

export default commentController;
