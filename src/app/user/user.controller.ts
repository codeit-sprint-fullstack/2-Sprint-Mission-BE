import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Like, Product, User } from '@prisma/client';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UserId } from 'src/decorators/user.decorator';

@Controller('me')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getMyProfile(
    @UserId() userId: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.service.findById(userId);
  }

  @Patch()
  async updateMyProfile(
    @UserId() userId: string,
    @Body() data: UpdateProfileDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.service.update(userId, data);
  }

  @Patch('password')
  async updateMyPassword(
    @UserId() userId: string,
    @Body('password') oldPassword: string,
    @Body('currentPassword') newPassword: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.service.updatePassword(userId, oldPassword, newPassword);
  }

  @Get('products')
  async getUserProducts(
    @UserId() userId: string,
    @Query()
    queries: Query.List,
  ): Promise<Product[]> {
    return await this.service.getUserProducts(userId, queries);
  }

  @Get('likes')
  async getUserLikes(
    @UserId() userId: string,
    @Query()
    queries: Query.List,
  ): Promise<Like[]> {
    return await this.service.getUserLikes(userId, queries);
  }
}
