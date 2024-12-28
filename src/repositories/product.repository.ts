import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get({ skip, take, sort, filter }) {
    return this.prisma.product.findMany({ skip, take, orderBy: sort, where: filter });
  }

  async count(filter) {
    return this.prisma.product.count({ where: filter });
  }

  async getById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async save(data) {
    return this.prisma.product.create({ data });
  }

  async update(id: string, data) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}