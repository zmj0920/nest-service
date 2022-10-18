import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperLog } from 'src/entities/oper-log.entity';

@ApiTags('操作日志模块')
@Controller('oper-log')
export class OperLogController {
  constructor(private readonly operLogService: OperLogService) {}

  @ApiOperation({
    summary: '添加操作日志',
  })
  @Post()
  create(@Body() dto: OperLog) {
    return this.operLogService.addOperLog(dto);
  }

  @ApiOperation({
    summary: '分页查询操作日志列表',
  })
  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.operLogService.getOperLogList({ limit, page });
  }

  @ApiOperation({
    summary: '删除操作日志',
  })
  @Delete(':operId')
  remove(@Param('operId') operId: number) {
    return this.operLogService.remove(operId);
  }
}
