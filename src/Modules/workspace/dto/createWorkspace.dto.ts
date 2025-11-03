import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator"

export class CreateWorkspceDto {
    @IsString()
    @MinLength(3)
    @ApiProperty({description:"Name of Workspace"})
    name:string

}