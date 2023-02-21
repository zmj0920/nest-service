import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginLog } from 'src/entities/login-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog)
    private loginLogRepository: Repository<LoginLog>,
  ) {}

  create(dto: LoginLog) {
    this.loginLogRepository.save(dto);
  }

  //分页查询登录日志
  async getLoginLogList(params: { limit: number; page: number }) {
    const { limit, page } = params;
    const db = this.loginLogRepository
      .createQueryBuilder('loginLog')
      .offset((page - 1) * limit)
      .limit(limit);
    const [list, total] = await db.getManyAndCount();
    return { list, page: { total, pageNum: page, pageSize: limit } };
  }

  // 删除登录日志
  remove(infoId: number) {
    this.loginLogRepository.delete(infoId);
  }
}
