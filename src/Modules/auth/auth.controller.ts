import { Body, Controller,  Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signinUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary:"API Used to Create new User"
  })
  async signupUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('signin')
  @ApiOperation({
    summary:"API Used to signin User"
  })
  async signinUser(@Body() signinUserDto: SigninUserDto
) {
    return this.authService.signInUser(signinUserDto);
  }

  @Post('verify-otp')
  @ApiOperation({
    summary:"API Used to Verify User OTP"
  })
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }


}
