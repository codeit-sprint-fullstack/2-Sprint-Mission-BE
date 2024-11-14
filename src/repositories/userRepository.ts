import { PrismaClient, User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  findByEmail = async (email: any): Promise<any> => {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  };

  createUser = async (user: any): Promise<User> => {
    return await this.prisma.user.create({
      data: user,
    });
  };
}
