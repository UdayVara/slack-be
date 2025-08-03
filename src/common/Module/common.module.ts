import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../Services/prisma.service';
import { MailService } from '../Services/mail.service';

@Global()
@Module({
  providers: [PrismaService,MailService],
  exports: [PrismaService,MailService],
})
export class CommonModule {}
