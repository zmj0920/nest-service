import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'class-validator';
import Redis from 'ioredis';
import { USER_TOKEN_KEY, USER_VERSION_KEY } from 'src/common/contants';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { md5 } from 'src/shared/utils';
import { LoginLogService } from '../login-log/login-log.service';
import { LoginDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
    private loginLogService: LoginLogService,
  ) {}

  /* 判断用户账号密码是否正确 */
  async validateUser(userInfo: LoginDto) {
    const username = userInfo.username;
    const password = userInfo.password;

    if (isEmpty(username) || isEmpty(password)) {
      throw new BusinessException(11005);
    }
    const user = await this.userService.getUserInfo(username);
    if (!user) throw new BusinessException(11005);
    const comparePassword = md5(password + user.salt);
    if (comparePassword !== user.password) throw new BusinessException(11005);
    return user;
  }

  /* 判断token 是否过期 或者被重置 */
  async validateToken(userId: number, pv: number, restoken: string) {
    const token = await this.redis.get(`${USER_TOKEN_KEY}:${userId}`);
    if (restoken !== token) throw new BusinessException(11002);
    const passwordVersion = parseInt(
      await this.redis.get(`${USER_VERSION_KEY}:${userId}`),
    );
    if (pv !== passwordVersion) throw new BusinessException(11006);
  }

  async login(request: any) {
    const { user } = request;
    const payload: Payload = { userId: user.userId, pv: 1 };
    //生成token
    let jwtSign = this.jwtService.sign(payload);
    //演示环境 复用 token，取消单点登录。
    // if (this.configService.get<boolean>('isDemoEnvironment')) {
    const token = await this.redis.get(`${USER_TOKEN_KEY}:${user.userId}`);
    if (token) {
      jwtSign = token;
    }
    // }
    //存储密码版本号，防止登录期间 密码被管理员更改后 还能继续登录
    await this.redis.set(`${USER_VERSION_KEY}:${user.userId}`, 1);
    //存储token, 防止重复登录问题，设置token过期时间(1天后 token 自动过期)，以及主动注销token。
    await this.redis.set(
      `${USER_TOKEN_KEY}:${user.userId}`,
      jwtSign,
      'EX',
      60 * 60 * 24,
    );
    //调用存储在线用户接口
    await this.loginLogService.addLogininfor(
      request,
      '登录成功',
      `${USER_TOKEN_KEY}:${user.userId}`,
    );
    return { token: jwtSign };
  }
}
