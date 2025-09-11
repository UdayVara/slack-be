import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspceDto } from './dto/createWorkspace.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TransferOwnershipDto } from './dto/transferOwnership.dto';

@Controller('workspace')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async createWorkSpace(@Body() createWorkspceDtoBody:CreateWorkspceDto,@Request() req:any){
    return await this.workspaceService.createWorkspace(createWorkspceDtoBody,req?.user?.id || null)
  }

  @Get()
  async getWorkspaceList(@Req() req:any){
    return await this.workspaceService.getWorkSpaceList(req?.user?.id)
  }

  @Put(":id")
  async updateWorkspaceList(@Param("id",ParseUUIDPipe) id:string,@Body() updateWorkspaceBody:CreateWorkspceDto,@Req() req:any){
    return await this.workspaceService.updateWorkspace(id,updateWorkspaceBody,req?.user?.id)
  }

  @Post("/transfer/:id")
  async transferWorkspace(@Param("id",ParseUUIDPipe) workspaceId:string,@Body() TransferOwnershipDtoBody:TransferOwnershipDto,@Req() req:any){
    return this.workspaceService.transferOwnership(TransferOwnershipDtoBody,workspaceId,req?.user?.id || null)
  }

  
  @Post("/leave/:id")
  async leaveWorkspace(@Param("id",ParseUUIDPipe) workspaceId:string, @Req() req:any){
    return await this.workspaceService.leaveWorkspace(workspaceId,req?.user?.id || null)
  }
}
