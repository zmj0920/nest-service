import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Dict } from 'src/entities/dict.entity';
import { DictService } from './dict.service';

@ApiTags('字典模块')
@ApiBearerAuth()
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @ApiOperation({
    summary: '添加字典数据',
  })
  @Post()
  create(@Body() dto: Dict) {
    this.dictService.create(dto);
  }

  @Get('getDict/:dictType')
  @ApiOperation({
    summary: '根据字典类型获取字典数据',
  })
  async getDict(@Param('dictType') dictType: string) {
    return await this.dictService.getDict(dictType);
  }

  @ApiOperation({
    summary: '分页查询字典列表',
  })
  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.dictService.getDictList({ limit, page });
  }

  @ApiOperation({
    summary: '更新字典',
  })
  @Patch(':dictId')
  update(@Param('dictId') dictId: number, @Body() dto: Dict) {
    this.dictService.updateDict(dictId, dto);
  }

  @ApiOperation({
    summary: '删除字典',
  })
  @Delete(':dictId')
  remove(@Param('dictId') dictId: number) {
    return this.dictService.remove(dictId);
  }
}
