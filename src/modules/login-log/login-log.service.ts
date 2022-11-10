import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_ONLINE_KEY } from 'src/common/contants';
import { LoginLog } from 'src/entities/login-log.entity';
import { User } from 'src/entities/user.entity';
import { getReqIP, IsLAN } from 'src/shared/utils';
import { Repository } from 'typeorm';
import * as uaParser from 'ua-parser-js';
import * as iconv from 'iconv-lite';

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLog)
    private loginLogRepository: Repository<LoginLog>,
    @InjectRedis() private readonly redis: Redis,
    private readonly httpService: HttpService,
  ) {}

  create(dto: LoginLog) {
    this.loginLogRepository.save(dto);
  }

  /* 通过ip获取地理位置 */
  async getLocation(ip: string) {
    if (IsLAN(ip)) return '内网IP';
    try {
      let { data } = await this.httpService.axiosRef.get(
        `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
        { responseType: 'arraybuffer' },
      );
      console.log(data);

      data = JSON.parse(iconv.decode(data, 'gbk'));
      return data.pro + ' ' + data.city;
    } catch (error) {
      return '未知';
    }
  }

  /* 新增登录日志 */
  async addLogininfor(request: any, msg: string, token?: string) {
    const loginLog = new LoginLog();
    const { username } = request.body;
    const { browser, os } = uaParser(request.headers['user-agent']); //获取用户电脑信息
    loginLog.userName = username;
    loginLog.ipaddr = getReqIP(request);
    loginLog.loginLocation = await this.getLocation(loginLog.ipaddr);
    loginLog.status = token ? '0' : '1';
    loginLog.msg = msg;
    // loginLog.loginTime = new Date().toString();
    loginLog.browser = browser.name + browser.version.split('.')[0];
    loginLog.os = os.name + os.version;
    if (token) {
      // 如果登录成功，就记录这个登录信息，方便在线用户查询
      const { user } = request;
      const data = { deptName: '', tokenId: token };
      if (user.deptId) {
        data.deptName = user.deptName;
      }
      const loginUser = Object.assign(loginLog, data);
      await this.redis.set(
        `${USER_ONLINE_KEY}:${user.userId}`,
        JSON.stringify(loginUser),
        'EX',
        60 * 60 * 24,
      );
    }
    return await this.loginLogRepository.save(loginLog);
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
