import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@ApiTags('部门模块')
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post()
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Get()
  findAll() {
    return this.deptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(+id, updateDeptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }
}
