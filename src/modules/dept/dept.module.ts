import { Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dept } from 'src/entities/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
