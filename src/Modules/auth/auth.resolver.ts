import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserInput } from './input/createUser.input';
import { AuthUserSuccessEntity } from './entity/authUserSuccess.entity';
import { VerifyOtpInput } from './input/verifyOtp.input';
import { VerifyOtpSuccessEntity } from './entity/VerifyOtpSuccess.entity';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthUserSuccessEntity,{name:"signupUser"})
  async signupUser(@Args('signupdata') createUserInput: CreateUserInput) {
    return await this.authService.createUser(createUserInput);
  }

  @Mutation(() => AuthUserSuccessEntity,{name:"signinUser"})
  async signinUser(@Args('signindata') createUserInput: CreateUserInput) {
    return this.authService.signInUser(createUserInput);
  }

  @Mutation(() => VerifyOtpSuccessEntity,{name:"verifyOtp"})
  async verifyOtp(@Args("verifyData") body: VerifyOtpInput) {
    return this.authService.verifyOtp(body);
  }

  @Query(() => UserEntity)
  getUser() {
    return this.authService.getUser();
  }
}
