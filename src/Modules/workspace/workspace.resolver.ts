import { Resolver } from '@nestjs/graphql';
import { WorkspaceService } from './workspace.service';

@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}
}
