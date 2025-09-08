import { IsString, IsUUID } from "class-validator";

export class TransferOwnershipDto{
    @IsString()
    @IsUUID()
    workspaceMemberId:string
    
    @IsString()
    @IsUUID()
    newOwnerId:string
}