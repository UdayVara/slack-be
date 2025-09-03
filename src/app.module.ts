import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/Module/common.module';
import { AuthModule } from './Modules/auth/auth.module';


@Module({
  imports: [
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CommonModule],
})
export class AppModule {}
