import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  async getUser(@Req() req) {
    const userId = req.user?.userId;

    if (!userId) {
      throw new Error('Invalid user');
    }
    return this.userService.getUserById(userId);
  }
}