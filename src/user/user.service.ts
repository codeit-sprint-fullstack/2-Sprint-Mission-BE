import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { CreateUserDTO } from '@/types/user.types';
import passwordHashing from '@/utils/passwordHashing';
import { ConflictError, NotFoundError } from '@/common/errors/CustomError';
import ErrorMessage from '@/common/enums/error.message.enums';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    return user;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    return user;
  }

  async createUser(userData: CreateUserDTO): Promise<User | null> {
    const { email, password } = userData;
    const existedUser = await this.userRepository.findUserByEmail(email);
    if (existedUser) throw new ConflictError(ErrorMessage.USER_EXIST);
    userData.password = await passwordHashing(password);
    const user = await this.userRepository.createUser(userData);
    return user;
  }
}
