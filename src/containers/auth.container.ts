import { prismaClient } from '#connection/postgres.connection.js';
import { AuthController } from '#controllers/auth.controller.js';
import { UserRepository } from '#repositories/user.repository.js';
import { AuthService } from '#services/auth.service.js';

const authModel = new UserRepository(prismaClient);
const authService = new AuthService(authModel);
const authController = new AuthController(authService);

export default authController;
