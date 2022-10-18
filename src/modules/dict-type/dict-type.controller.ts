import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictType } from 'src/entities/dict-type.entity';
import { DictTypeService } from './dict-type.service';

@ApiTags('字典类别模块')
@Controller('dict-type')
export class DictTypeController {
  constructor(private readonly dictTypeService: DictTypeService) {}

  @ApiOperation({
    summary: '创建字典类型',
  })
  @Post()
  async create(@Body() dto: DictType) {
    return await this.dictTypeService.create(dto);
  }

  @ApiOperation({
    summary: '根据id查询字典类型',
  })
  @Get(':dictTypeId')
  async findOne(@Param('dictTypeId') dictTypeId: number) {
    return await this.dictTypeService.getDictTypeById(dictTypeId);
  }

  @ApiOperation({
    summary: '更新字典类型',
  })
  @Patch(':dictTypeId')
  async update(@Param('dictTypeId') dictTypeId: number, @Body() dto: DictType) {
    return await this.dictTypeService.update(dictTypeId, dto);
  }

  @ApiOperation({
    summary: '删除字典类型',
  })
  @Delete(':dictTypeId')
  async remove(@Param('dictTypeId') dictTypeId: number) {
    return await this.dictTypeService.remove(dictTypeId);
  }

  @ApiOperation({
    summary: '分页查询字典类型列表',
  })
  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.dictTypeService.getDictTypeList({ limit, page });
  }
}
