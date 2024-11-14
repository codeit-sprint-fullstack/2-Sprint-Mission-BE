import { PrismaClient } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  findByEmail = async (email: any) => {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  };

  createUser = async (user: any) => {
    return await this.prisma.user.create({
      data: user,
    });
  };
}
