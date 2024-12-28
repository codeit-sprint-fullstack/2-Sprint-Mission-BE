import { Injectable } from "@nestjs/common";
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string) {
    return this.userRepository.getUserById(userId);
  }
}