import { PartialType } from '@nestjs/swagger';
import { LoginDto } from 'src/app/auth/dto/login.dto';

export class UpdateProfileDto extends PartialType(LoginDto) {}
