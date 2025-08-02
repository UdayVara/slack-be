import { Field, InputType } from '@nestjs/graphql';
import { Platform } from '../enum/platform.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => Platform)
  platform: Platform;
}