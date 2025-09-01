import { Field, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "src/Modules/auth/entity/user.entity";

@ObjectType()
export class WorkspaceEntity {

    @Field(() =>String)
    id:string;

    @Field(() => String)
    name:string;

    @Field(()=>Date)
    createdDate:Date;

    @Field(()=>Date)
    updatedDate:Date;

    @Field(()=>UserEntity)
    user:UserEntity

    @Field(()=>String)
    createdBy:string;
}