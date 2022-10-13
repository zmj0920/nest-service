import { Module } from '@nestjs/common';
import { DictTypeService } from './dict-type.service';
import { DictTypeController } from './dict-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictType } from 'src/entities/dict-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictType])],
  controllers: [DictTypeController],
  providers: [DictTypeService],
  exports: [DictTypeService],
})
export class DictTypeModule {}
