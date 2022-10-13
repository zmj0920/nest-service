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
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@ApiTags('字典模块')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post()
  create(@Body() createDictDto: CreateDictDto) {}

  @Get('getDict/:dictType')
  @ApiOperation({
    summary: '根据字典类型获取字典数据',
  })
  async getDict(@Param('dictType') dictType: string) {
    return await this.dictService.getDict(dictType);
  }

  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.dictService.getDictList({ limit, page });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictDto: UpdateDictDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
