import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserInput } from './input/createUser.input';
import { AuthUserSuccessEntity } from './entity/authUserSuccess.entity';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthUserSuccessEntity)
  async signupUser(@Args('signupdata') createUserInput: CreateUserInput) {
    return await this.authService.createUser(createUserInput);
  }

  @Mutation(() => AuthUserSuccessEntity)
  async signinUser(@Args('signindata') createUserInput: CreateUserInput) {
    return this.authService.signInUser(createUserInput);
  }

  @Query(() => UserEntity)
  getUser() {
    return this.authService.getUser();
  }
}
