import { AuthService } from './auth.service';

import { Controller, Post, UseGuards, Query, Req, Body } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PayloadUser } from 'src/common/decorators/user.decorator';
import { LoginDto } from '../user/user.dto';
import { Public } from 'src/common/decorators';

@ApiTags('用户认证')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '登出',
    description: '服务器端清除 jwt cookies',
  })
  @Post('logout')
  async logout() {
    return {};
  }

  @ApiOperation({
    summary: '登录接口',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(
    @PayloadUser() user: Payload,
    // @Res({ passthrough: true }) response: FastifyReply,
    @Req() req: any,
    @Body() query: LoginDto,
  ) {
    return await this.authService.login(req);
    // return user;
    // const { access_token, userInfo } = await this.authService.login(user);
    // response.setCookie('jwt', access_token, {
    //   path: '/',
    // });
    // return {
    //   userInfo,
    //   access_token,
    // };
  }

  @ApiOperation({
    summary: '查询个人信息',
  })
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  profile() {
    return {};
  }
}
