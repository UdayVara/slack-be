import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signinUser.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signupUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('signin')
  async signinUser(@Body() signinUserDto: SigninUserDto
) {
    return this.authService.signInUser(signinUserDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }

  @Get('user')
  async getUser() {
    return this.authService.getUser();
  }
}
