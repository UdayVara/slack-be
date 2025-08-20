import { Field, InputType } from '@nestjs/graphql';
import { Platform } from '../enum/platform.enum';
import { IsEmail, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => Platform)
  @IsEnum(Platform)
  platform: Platform;
}