import { prismaClient } from '../connection/postgres.connection.js';
import { CommentRepo } from '../repo/comment.repo.js';
import { CommentService } from '../services/comment.service.js';
import { CommentController } from '../controllers/comment.controller.js';

const commentModel = new CommentRepo(prismaClient);
const commentService = new CommentService(commentModel);
const commentController = new CommentController(commentService);

export { commentController };
