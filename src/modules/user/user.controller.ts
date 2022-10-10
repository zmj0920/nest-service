import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessTypeEnum, Log } from 'src/common/decorators';
import { UserService } from './user.service';

@ApiTags('管理员模块')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '新增管理员',
  })
  @Get('list')
  @Log({
    title: '获取管理员资料',
    businessType: BusinessTypeEnum.other
  })
  async list(): Promise<any> {
   return await this.userService.findUserByUserName();
  }
}
