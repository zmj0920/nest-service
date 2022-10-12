import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/entities/role.entity';
import { BusinessException } from 'src/common/exceptions/business.exception.ts';

@ApiTags('角色模块')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiOperation({
    summary: '创建新角色',
  })
  @Post()
  create(@Body() dto: Role) {
    return this.roleService.create(dto);
  }

  @ApiOperation({
    summary: '角色分配权限',
    description: '',
  })
  @Put('permission')
  async set(@Body() dto: any) {
    await this.roleService.remove(dto.roleId);
    return await this.roleService.set(dto.roleId, dto.menuIds);
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @ApiOperation({
    summary: '修改角色信息',
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: Role) {
    const foundRole = await this.roleService.findById(id);
    if (!foundRole) {
      throw new BusinessException(10017);
    }
    return await this.roleService.update({ ...foundRole, ...dto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
