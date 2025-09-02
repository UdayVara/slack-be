import { Field, ObjectType } from "@nestjs/graphql";
import { WorkspaceEntity } from "./workspace.entity";
import { UserEntity } from "src/Modules/auth/entity/user.entity";
import { WorkspaceUsersRole } from "../enum/workspace.userrole.enum";

@ObjectType()
export class WorkspaceUser {

    @Field(()=>String)
    id:string;
    
    @Field(()=>WorkspaceEntity)
    workspace:WorkspaceEntity

    @Field(()=>UserEntity)
    user:UserEntity

    @Field(()=>String)
    workspaceId:string;

    @Field(() => String)
    userId:string;

    @Field(() => Boolean)
    isActive:boolean;

    @Field(()=>Date)
    joinedAt:Date;

    @Field(()=>Date)
    createdAt:Date

    @Field(()=>Date)
    updatedAt:Date

    @Field(()=>WorkspaceUsersRole)
    role:WorkspaceUsersRole
}