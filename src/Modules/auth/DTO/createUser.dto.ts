import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { platform } from 'generated/prisma';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({description:"Email of User"})
  email: string;

  @IsString()
  @ApiProperty({description:"Username"})
  username: string;

  @IsEnum(platform)
  @ApiProperty({description:"platform user came from"})
  platform: platform;
}
