import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userContainer = { userController };
