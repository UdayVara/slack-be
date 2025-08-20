import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../Services/prisma.service';
import { MailService } from '../Services/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports:[ JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  })],
  providers: [PrismaService,MailService],
  exports: [PrismaService,MailService],
})
export class CommonModule {}
