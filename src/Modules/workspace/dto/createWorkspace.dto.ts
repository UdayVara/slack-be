import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateWorkspceDto {
    @IsString()
    @MinLength(3)
    @ApiProperty({description:"Name of Workspace"})
    name:string

    @IsNotEmpty()
    @ApiProperty({
        description:"Image of Workspace",
        type:"string",
        format:"binary"
    })
    workspaceImage:File;
}