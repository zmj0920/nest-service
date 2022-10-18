import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperLog } from 'src/entities/oper-log.entity';
import { Repository } from 'typeorm';

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

  //分页查询操作日志
  async getOperLogList(params: { limit: number; page: number }) {
    const { limit, page } = params;
    const db = this.operLogRepository
      .createQueryBuilder('operLog')
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }

  // 删除操作日志
  remove(infoId: number) {
    this.operLogRepository.delete(infoId);
  }
}
