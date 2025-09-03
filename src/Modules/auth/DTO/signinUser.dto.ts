import { IsEmail } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  email: string;
}
