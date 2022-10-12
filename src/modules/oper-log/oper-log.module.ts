import { Module } from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { OperLogController } from './oper-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperLog } from 'src/entities/oper-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperLog])],
  controllers: [OperLogController],
  providers: [OperLogService],
  exports: [OperLogService],
})
export class OperLogModule {}
