
import { registerEnumType } from '@nestjs/graphql';
import { platform } from 'generated/prisma';

registerEnumType(platform, {
  name: 'Platform', 
  description: 'The platform enum from Prisma',
});

export { platform as Platform };
