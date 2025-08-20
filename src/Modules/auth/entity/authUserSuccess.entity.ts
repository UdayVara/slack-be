import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class AuthUserSuccessEntity {
    @Field(() => Number)
    statusCode:number;

    @Field(()=>String)
    message:string;

    @Field(()=>String)
    email:string;

}