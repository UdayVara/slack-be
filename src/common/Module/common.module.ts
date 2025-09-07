import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../Services/prisma.service';
import { MailService } from '../Services/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from 'src/Processors/email.processor';

@Global()
@Module({
  imports:[ JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
  }), BullModule.forRoot({
        connection: {
          host: 'localhost',
          port: 6379,
          
        },
      }),
      BullModule.registerQueue({
        name: 'email',
        prefix:"email:otp",
        
      }),],
  
  providers: [PrismaService,MailService,EmailProcessor],
  exports: [PrismaService,MailService,BullModule],
})
export class CommonModule {}
