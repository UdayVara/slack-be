import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "./user.entity";

@ObjectType()
export class VerifyOtpSuccessEntity {
    @Field(()=>Number)
    statusCode:number;

    @Field(()=>String)
    message:string;

    @Field(()=>UserEntity)
    user:UserEntity;

    @Field(()=>String)
    token:string;
}
