import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Like, Product, User } from '@prisma/client';
import { ComparePassword, HashingPassword } from 'src/utils/HashPassword';
import { ProductSort, Sort } from 'src/utils/sortOption';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findById(id);
    const { password, ...data } = user;

    return data;
  }

  async update(
    userId: string,
    data: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    const where = { id: userId };
    const user = await this.repository.update(where, data);
    const { password, ...updatedData } = user;

    return updatedData;
  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findById(userId);
    const verifiedPassword = await ComparePassword(oldPassword, user.password);

    if (!verifiedPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }

    const where = { id: userId };
    const hashedPassword = await HashingPassword(newPassword);
    const updatedUser = await this.repository.updatePassword(
      where,
      hashedPassword,
    );
    const { password, ...updatedData } = updatedUser;

    return updatedData;
  }

  async getUserProducts(
    userId: string,
    queries: Query.List,
  ): Promise<Product[]> {
    const { skip, take, orderBy } = queries;

    const where = { ownerId: userId };
    const sortOrder = ProductSort(orderBy);

    return this.repository.getUserProducts(skip, take, where, sortOrder);
  }

  async getUserLikes(userId: string, queries: Query.List): Promise<Like[]> {
    const { skip, take, orderBy } = queries;

    const where = { userId };
    const sortOrder = Sort(orderBy);

    return this.repository.getUserLikes(skip, take, where, sortOrder);
  }
}
