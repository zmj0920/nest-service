import { Module } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { LoginLogController } from './login-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginLog } from 'src/entities/login-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginLog])],
  controllers: [LoginLogController],
  providers: [LoginLogService],
})
export class LoginLogModule {}
