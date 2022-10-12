import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperLog } from 'src/entities/oper-log.entity';
import { Repository } from 'typeorm';
import { CreateOperLogDto } from './dto/create-oper-log.dto';
import { UpdateOperLogDto } from './dto/update-oper-log.dto';

@Injectable()
export class OperLogService {
  constructor(
    @InjectRepository(OperLog)
    private readonly operLogRepository: Repository<OperLog>,
  ) {}
  // 新增操作日志
  async addOperLog(operLog: OperLog) {
    return await this.operLogRepository.save(operLog);
  }

  create(createOperLogDto: CreateOperLogDto) {
    return 'This action adds a new operLog';
  }

  findAll() {
    return `This action returns all operLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operLog`;
  }

  update(id: number, updateOperLogDto: UpdateOperLogDto) {
    return `This action updates a #${id} operLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} operLog`;
  }
}
