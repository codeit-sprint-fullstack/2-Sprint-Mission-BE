import { prismaClient } from '../db/postgres.connection.js';
import { CommentModel } from '../models/comment.model.js';
import { CommentService } from '../services/comment.service.js';
import { CommentController } from '../controllers/comment.controller.js';

const commentModel = new CommentModel(prismaClient);
const commentService = new CommentService(commentModel);
const commentController = new CommentController(commentService);

export { commentController };
