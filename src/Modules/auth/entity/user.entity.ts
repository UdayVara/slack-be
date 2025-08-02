import { Field, ObjectType } from '@nestjs/graphql';
import { Platform } from '../enum/platform.enum';

@ObjectType()
export class UserEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => Platform)
  platform: Platform;
}