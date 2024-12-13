import { prismaClient } from '#connection/postgres.connection.js';
import { TokenVerifier } from '#middlewares/token.verifier.js';
import { UserRepository } from '#repositories/user.repository.js';
import { UserService } from '#services/user.service.js';

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const tokenVerifier = new TokenVerifier(userService);

export default tokenVerifier;
