import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SigninUserInput{
    @Field(() => String)
    email:string;
}