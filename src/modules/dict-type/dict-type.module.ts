import { Module } from '@nestjs/common';
import { DictTypeService } from './dict-type.service';
import { DictTypeController } from './dict-type.controller';

@Module({
  controllers: [DictTypeController],
  providers: [DictTypeService]
})
export class DictTypeModule {}
