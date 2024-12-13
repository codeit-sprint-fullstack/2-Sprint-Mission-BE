import { prismaClient } from '#connection/postgres.connection.js';
import { UserController } from '#controllers/user.controller.js';
import { UserRepository } from '#repositories/user.repository.js';
import { UserService } from '#services/user.service.js';

const userModel = new UserRepository(prismaClient);
const userService = new UserService(userModel);
const userController = new UserController(userService);

export default userController;
