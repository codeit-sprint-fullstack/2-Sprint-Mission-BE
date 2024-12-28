import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from '@/types/user.types';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/id/:id')
  async findUserById(@Param('id') id: string): Promise<User | null> {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO): Promise<User | null> {
    const user = await this.userService.createUser(userData);
    return user;
  }
}
