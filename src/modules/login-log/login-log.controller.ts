import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginLog } from 'src/entities/login-log.entity';

@ApiTags('用户登录日志模块')
@ApiBearerAuth()
@Controller('login-log')
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) {}

  @ApiOperation({
    summary: '添加登录日志信息',
  })
  @Post()
  create(@Body() dto: LoginLog) {
    return this.loginLogService.create(dto);
  }

  @ApiOperation({
    summary: '分页查询登录日志列表',
  })
  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.loginLogService.getLoginLogList({ limit, page });
  }

  @ApiOperation({
    summary: '删除登录日志信息',
  })
  @Delete(':infoId')
  remove(@Param('infoId') infoId: number) {
    return this.loginLogService.remove(infoId);
  }
}
