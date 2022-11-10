import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from 'src/modules/user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, //设置回调函数第一个参数为 request
    });
  }

  async validate(request, username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ username, password });
    return user; //返回值会被 守卫的  handleRequest方法 捕获
  }
}
