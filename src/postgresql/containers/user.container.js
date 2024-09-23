import { prismaClient } from '../connection/postgres.connection.js';
import { UserDB } from '../db/user.db.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const userModel = new UserDB(prismaClient);
const userService = new UserService(userModel);
const userController = new UserController(userService);

export { userController };
