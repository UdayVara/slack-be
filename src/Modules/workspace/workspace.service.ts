import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/Services/prisma.service';

@Injectable()
export class WorkspaceService {

    constructor(private readonly prisma:PrismaService){}

    async getUserWorkspaces(userId:string){
        if(!userId){
            throw new BadRequestException("User Id is required")
        }
        try {
            const checkuser = await this.prisma.user.findFirst({
                where:{
                    id:userId
                }
            })
            if(!checkuser){
                throw new BadRequestException("User Not Found")
            }

            return this.prisma.workspaceUsers.findMany({
                where:{
                    userId:userId
                },
                include:{
                    workspace:true,
                    user:true
                }
            })
        } catch (error) {
            console.log("getUserWorkspaces",error)
            throw new InternalServerErrorException(error.message || "Internal server Error")
        }


    }
}
