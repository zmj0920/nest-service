import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';
import { md5 } from 'src/common/utils';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  /* 判断用户账号密码是否正确 */
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserInfo(username);
    if (!user) throw new BusinessException(11005);
    const comparePassword = md5(password + user.salt);
    if (comparePassword !== user.password) throw new BusinessException(11005);
    return user;
  }

  async login(user: any) {
    // const payload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
