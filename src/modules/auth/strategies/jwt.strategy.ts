import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/common/contants';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true, //设置回调的第一个参数是  request
    });
  }

  async validate(request: Request, payload: Payload) {
    const { userId, pv } = payload;
    // const token = request.headers['authorization'];
    

    const token = (request.headers as any).authorization.slice(7);
    console.log(token);
    // await this.authService.validateToken(userId, pv, token);
    return payload; //返回值会被 守卫的  handleRequest方法 捕获
  }
}
