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
import { BusinessTypeEnum, Log } from 'src/common/decorators';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiOperation({
  //   summary: '新增管理员',
  // })
  // @Get('list')
  // @Log({
  //   title: '获取管理员资料',
  //   type: BusinessTypeEnum.other,
  // })
  // async list(): Promise<any> {
  //   return await this.userService.findUserByUserName();
  // }

  @ApiOperation({
    summary: '新增用户',
  })
  @Post()
  create(@Body() dto: User) {
    return this.userService.create(dto);
  }

  @ApiOperation({
    summary: '根据用户名查询',
  })
  @Get(':name')
  getUserInfo(@Param('name') name: string) {
    return this.userService.getUserInfo(name);
  }

  @ApiOperation({
    summary: '分页查询用户列表',
  })
  @Get('list/:pageSize/:page')
  list(@Param('pageSize') limit: number, @Param('page') page: number) {
    return this.userService.getUserList({ limit, page });
  }

  @ApiOperation({
    summary: '根据部门deptId查询用户列表',
  })
  @Post('list')
  deptList(@Body() params: { limit: number; page: number; deptId: number }) {
    return this.userService.getUserList(params);
  }

  @ApiOperation({
    summary: '修改用户信息',
  })
  @Patch(':userId')
  update(@Param('userId') userId: number, @Body() dto: User) {
    return this.userService.update(userId, dto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete(':userId')
  remove(@Param('userId') userId: number) {
    return this.userService.remove(userId);
  }
}
