import { prismaClient } from '../connection/postgres.connection.js';
import { CommentDB } from '../db/comment.db.js';
import { CommentService } from '../services/comment.service.js';
import { CommentController } from '../controllers/comment.controller.js';

const commentModel = new CommentDB(prismaClient);
const commentService = new CommentService(commentModel);
const commentController = new CommentController(commentService);

export { commentController };
