import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { CreateOperLogDto } from './dto/create-oper-log.dto';
import { UpdateOperLogDto } from './dto/update-oper-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('操作日志模块')
@Controller('oper-log')
export class OperLogController {
  constructor(private readonly operLogService: OperLogService) {}

  @Post()
  create(@Body() createOperLogDto: CreateOperLogDto) {
    return this.operLogService.create(createOperLogDto);
  }

  @Get()
  findAll() {
    return this.operLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperLogDto: UpdateOperLogDto) {
    return this.operLogService.update(+id, updateOperLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operLogService.remove(+id);
  }
}
