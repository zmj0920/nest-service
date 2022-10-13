import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dict } from 'src/entities/dict.entity';
import { DictType } from 'src/entities/dict-type.entity';
import { DictTypeModule } from '../dict-type/dict-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dict, DictType]), DictTypeModule],
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule {}
