import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from 'src/common/Services/mail.service';
import { PrismaService } from 'src/common/Services/prisma.service';

@Processor('email',{concurrency:3})
export class EmailProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) 
  { super() }

  // 👇 Required implementation of WorkerHost
  async process(job: Job<any, any, string>): Promise<any> {
    console.log('Processing job:', job.data);

    // Example OTP logic
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.loginCodes.create({
      data: { code: otp, userId: job.data.user.id, isExpired: false },
    });
    await this.mailService.sendOtpMail(
      job.data.user.email,
      job.data.user.username,
      otp,
    );

    return true;
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job) {
    console.log('Job completed! EMAIL OTP SENT TO ', job.data.user.email);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job) {
    console.log('Job failed:', job.data);
  }
}
