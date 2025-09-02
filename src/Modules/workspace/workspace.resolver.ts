import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WorkspaceService } from './workspace.service';
import { WorkspaceUser } from './entity/workspaceuser.entity';
import { Request, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { UserEntity } from '../auth/entity/user.entity';
import { WorkspaceEntity } from './entity/workspace.entity';

@Resolver(()=>WorkspaceUser)
@UseGuards(GqlAuthGuard)
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query(()=>[WorkspaceUser])
  getWorkspace(@Context() context : any){
    return this.workspaceService.getUserWorkspaces(context?.req?.user?.id || null)
  }

  @ResolveField("user")
  user(@Parent() workspaceUser:WorkspaceUser){
    return workspaceUser.user
  }

  @ResolveField("workspace")
  workspace(@Parent() workspaceUser:WorkspaceUser){
    return workspaceUser.workspace
  }
}
