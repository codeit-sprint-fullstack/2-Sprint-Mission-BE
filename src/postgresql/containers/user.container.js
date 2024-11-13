import { prismaClient } from '../connection/postgres.connection.js';
import { UserRepo } from '../repo/user.repo.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const userModel = new UserRepo(prismaClient);
const userService = new UserService(userModel);
const userController = new UserController(userService);

export { userController };
