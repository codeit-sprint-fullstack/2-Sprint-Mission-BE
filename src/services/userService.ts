import { UserRepository } from "../repositories/userRepository";
import { User } from "../types/userType";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private repository: UserRepository) {}

  createUser = async (user: User): Promise<any> => {
    const userEmail = await this.repository.findByEmail(user.email);
    if (userEmail) {
      const error = new Error("User already exists");
      throw error;
    }
    const hashedPassword = await this.hashingPassword(user.password);
    const { password, ...userWithoutPassword } = user;
    const createUser = await this.repository.createUser({
      ...userWithoutPassword,
      encryptedPassword: hashedPassword,
    });
    return this.filterSensitiveUserData(createUser);
  };

  filterSensitiveUserData = (user: any) => {
    const { password, refreshToken, ...rest } = user;
    return rest;
  };

  hashingPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  getUser = async (email: string, password: string): Promise<any> => {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      const error = new Error("Unauthorized");
      throw error;
    }
    this.verifyPassword(password, user.encryptedPassword);
    return this.filterSensitiveUserData(user);
  };

  verifyPassword = async (
    inputPassword: string,
    savedPassword: string
  ): Promise<any> => {
    const isValid = await bcrypt.compare(inputPassword, savedPassword);
    if (!isValid) {
      const error = new Error("Unauthorized");
      throw error;
    }
  };

  createToken = (userId: string, type: string = "access") => {
    const payload = { userId };
    const options = { expiresIn: type === "refresh" ? "2w" : "1h" };
    return jwt.sign(payload, process.env.JWT_SECRET as string, options);
  };

  updateUser = async (id: string, data: any) => {
    return await this.repository.updateUser(id, data);
  };

  refreshToken = async (userId: string, refreshToken: any): Promise<any> => {
    const user = await this.repository.findByUserId(userId);
    if (!user || user.refreshToken !== refreshToken) {
      const error = new Error("Unauthorized");
      throw error;
    }
    return this.createToken(user);
  };
}
