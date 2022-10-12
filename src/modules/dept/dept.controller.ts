import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@ApiTags('部门模块')
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post()
  create(@Body() createDeptDto: CreateDeptDto) {}

  @Get()
  findAll() {
    return this.deptService.treeDept();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
