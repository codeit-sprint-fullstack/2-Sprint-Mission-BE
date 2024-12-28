import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async save(user) {
    return this.prisma.user.create({ data: { email: user.email, password: user.password, nickname: user.nickname } });
  }

  async update(id: string, data) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async createOrUpdate(provider: string, providerId: string, email: string, nickname: string) {
    const randomPassword = await bcrypt.hash(randomBytes(8).toString('base64'), 10);
    const existingUser = await this.prisma.user.findFirst({ where: { OR: [{ email }, { provider, providerId }] } });
  }
}