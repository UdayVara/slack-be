import { IsString, MinLength } from "class-validator"

export class CreateWorkspceDto {
    @IsString()
    @MinLength(3)
    name:string
}