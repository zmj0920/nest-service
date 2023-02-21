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
import { Dept } from 'src/entities/dept.entity';
import { DeptService } from './dept.service';

@ApiTags('部门模块')
@ApiBearerAuth()
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @ApiOperation({
    summary: '创建部门',
  })
  @Post('crate')
  create(@Body() dto: Dept) {
    return this.deptService.create(dto);
  }

  @ApiOperation({
    summary: '查询部门树结构',
  })
  @Get('tree')
  tree() {
    return this.deptService.treeDept();
  }

  @ApiOperation({
    summary: '查询部门列表',
  })
  @Get('list')
  list() {
    return this.deptService.list();
  }

  @ApiOperation({
    summary: '修改部门信息',
  })
  @Patch('/:deptId')
  upadte(@Param('deptId') deptId: number, @Body() param: Dept) {
    return this.deptService.update(deptId, param);
  }

  @ApiOperation({
    summary: '删除部门信息',
  })
  @Delete(':deptId')
  remove(@Param('deptId') deptId: number) {
    return this.deptService.delete(deptId);
  }

  @ApiOperation({
    summary: '根据部门id查询部门信息',
  })
  @Get(':deptId')
  findOne(@Param('deptId') deptId: number) {
    return this.deptService.findById(deptId);
  }
}
