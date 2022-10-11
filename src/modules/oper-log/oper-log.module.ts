import { Module } from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { OperLogController } from './oper-log.controller';

@Module({
  controllers: [OperLogController],
  providers: [OperLogService]
})
export class OperLogModule {}
