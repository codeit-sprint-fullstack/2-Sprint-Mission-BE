import { prismaClient } from '../db/postgres.connection.js';
import { UserModel } from '../models/user.model.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const userModel = new UserModel(prismaClient);
const userService = new UserService(userModel);
const userController = new UserController(userService);

export { userController };
