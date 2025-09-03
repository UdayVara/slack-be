import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Length(6)
  otp: string;
}
