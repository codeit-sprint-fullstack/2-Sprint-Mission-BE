import { UserRepository } from "../repositories/userRepository";

export class UserService {
  constructor(private repository: UserRepository) {}

  createUser = async (user: any) => {
    const userEmail = await this.repository.findByEmail(user.email);
    if (userEmail) {
      const error = new Error("User already exists");
      throw error;
    }
    const createUser = await this.repository.createUser({ ...user });
    return this.filterSensitiveUserData(createUser);
  };

  filterSensitiveUserData = (user: any) => {
    const { password, ...rest } = user;
    return rest;
  };
}
