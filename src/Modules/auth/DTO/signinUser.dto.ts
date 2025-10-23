import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  @ApiProperty({description:"Email of User"})
  email: string;
}
