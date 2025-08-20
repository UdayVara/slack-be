import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, Length } from "class-validator";

@InputType()
export class VerifyOtpInput{
    @Field(() => String)
    @IsString()
    @IsEmail()
    email:string;

    @Field(() => String)
    @IsString()
    @Length(6)
    otp:string;
}