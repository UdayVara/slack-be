import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/Services/prisma.service';
import { CreateWorkspceDto } from './dto/createWorkspace.dto';
import { workspaceUsersRole } from 'generated/prisma';
import { TransferOwnershipDto } from './dto/transferOwnership.dto';
import { CloudinaryService } from 'src/common/Services/cloudinary.service';

@Injectable()
export class WorkspaceService {
    constructor(private readonly prisma: PrismaService,private readonly cloudinary:CloudinaryService){}

    async createWorkspace(createWorkspaceDto: CreateWorkspceDto,file:Express.Multer.File,userId:string) {
        try{
        const imageUploadData = await this.cloudinary.uploadImage(file,"workspaces")
        const res = await this.prisma.workspace.create({
            data: {
                name: createWorkspaceDto.name,
                createdBy: userId,
                workspaceImage:imageUploadData.secure_url
            },
        });

        if(res){
            return {statusCode:201,message:"Workspace Created Successfully",data:res}
        }else{
            throw new InternalServerErrorException("Workspace Not Created")
        }
    }catch(error){
        console.log("createWorkspace",error)
        throw new InternalServerErrorException(error?.message || "Internal Server Error")
    }
}

    async getWorkSpaceList(userId:string){
        try{
            const res =  this.prisma.workspaceUsers.findMany({
                where:{
                    userId:userId
                },
                include:{
                    workspace:true,
                    user:true
                }
            })

            if(res){
                return {statusCode:200,message:"Workspace User Found Successfully",data:res}
            }else{
                throw new InternalServerErrorException("Workspace User Not Found")
            }
        }catch(error){
            console.log("getWorkspaceUser",error)
            throw new InternalServerErrorException(error?.message || "Internal Server Error")
        }
    }

    async updateWorkspace(workspaceId:string,updateWorkspaceDto:CreateWorkspceDto,userId:string){
        try{
            const res = await this.prisma.workspace.findFirst({
                where:{
                    id:workspaceId,
                    createdBy:userId
                }
            })

            if(!res){
                throw new BadRequestException("Workspace Not Found")
            }else{
                const updateRes = await this.prisma.workspace.update({
                    where:{
                        id:workspaceId,
                        createdBy:userId
                    },
                    data:{
                        name:updateWorkspaceDto.name
                    }
                })

                if(updateRes){
                    return {statusCode:201,message:"Workspace Updated Successfully",data:updateRes}
                }else{
                    throw new InternalServerErrorException("Workspace Not Updated")
                }
            }
        }catch(error){
            console.log("updateWorkspace",error)
            throw new InternalServerErrorException(error?.message || "Internal Server Error")
        }
    }

    async leaveWorkspace(workSpaceMemberId:string,userId:string){
        try {
           const findWorkspace = await this.prisma.workspaceUsers.findFirst({
            where:{
                id:workSpaceMemberId,
                role:workspaceUsersRole.owner,
                userId:userId
            }
           })

           if(findWorkspace){
            throw new BadRequestException("You Can't Leave Workspace")
           }else{
            const leaveWorkspace = await this.prisma.workspaceUsers.update({
                where:{
                    id:workSpaceMemberId
                },
                data:{
                    isActive:false
                }
            })

            if(leaveWorkspace){
                return {statusCode:201,message:"Workspace Left Successfully",data:leaveWorkspace}
            }else{
                throw new InternalServerErrorException("Workspace Not Left")
            }
           }
        } catch (error) {
            console.log("leaveWorkspace",error)
            throw new InternalServerErrorException(error?.message || "Internal Server Error")
        }
    }

    async transferOwnership(transferOwnershipDto:TransferOwnershipDto,workspaceId:string,userId:string){
        try {
            const res = await this.prisma.workspaceUsers.findFirst({
                where:{
                    id:transferOwnershipDto.workspaceMemberId,
                    workspaceId:workspaceId,
                    role:workspaceUsersRole.owner,
                    userId:userId
                }
            })

            if(!res){
                throw new BadRequestException("You Can't Transfer Ownership")
            }else{
                const updateRes = await this.prisma.workspaceUsers.update({
                    where:{
                        id:transferOwnershipDto.workspaceMemberId
                    },
                    data:{
                        role:workspaceUsersRole.owner
                    }
                })

                if(updateRes){
                    return {statusCode:201,message:"Workspace Ownership Transferred Successfully",data:updateRes}
                }else{
                    throw new InternalServerErrorException("Workspace Ownership Not Transferred")
                }
            }
        } catch (error) {
            console.log("transferOwnership",error)
            throw new InternalServerErrorException(error?.message || "Internal Server Error")
        }
    }
}