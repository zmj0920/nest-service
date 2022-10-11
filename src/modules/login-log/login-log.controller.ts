import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { UpdateLoginLogDto } from './dto/update-login-log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户登录日志模块')
@Controller('login-log')
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) {}

  @Post()
  create(@Body() createLoginLogDto: CreateLoginLogDto) {
    return this.loginLogService.create(createLoginLogDto);
  }

  @Get()
  findAll() {
    return this.loginLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginLogDto: UpdateLoginLogDto) {
    return this.loginLogService.update(+id, updateLoginLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginLogService.remove(+id);
  }
}
