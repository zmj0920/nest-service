import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DictTypeService } from './dict-type.service';
import { CreateDictTypeDto } from './dto/create-dict-type.dto';
import { UpdateDictTypeDto } from './dto/update-dict-type.dto';

@ApiTags('字典类别模块')
@Controller('dict-type')
export class DictTypeController {
  constructor(private readonly dictTypeService: DictTypeService) {}

  @Post()
  create(@Body() createDictTypeDto: CreateDictTypeDto) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictTypeDto: UpdateDictTypeDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
