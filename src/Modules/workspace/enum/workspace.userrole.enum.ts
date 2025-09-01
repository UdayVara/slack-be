
import { registerEnumType } from '@nestjs/graphql';
import {workspaceUsersRole } from 'generated/prisma';

registerEnumType(workspaceUsersRole, {
  name: 'WorkspaceUserRole', 
  description: 'The platform enum from Prisma',
});

export { workspaceUsersRole as WorkspaceUsersRole };
