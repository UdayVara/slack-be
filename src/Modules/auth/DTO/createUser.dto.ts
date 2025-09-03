import { IsEmail, IsString, IsEnum } from 'class-validator';
import { platform } from 'generated/prisma';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsEnum(platform)
  platform: platform;
}
