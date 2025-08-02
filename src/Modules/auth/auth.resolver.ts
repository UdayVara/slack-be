import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver(() => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World';
  }
}
