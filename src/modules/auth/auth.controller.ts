import { Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayloadUser, Public } from 'src/common/decorators';
import { LoginDto } from 'src/modules/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
@ApiBearerAuth()
@ApiTags()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Create cat' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Query() query: LoginDto,) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Create cat' })
  @Get('profile')
  getProfile(@PayloadUser() user: Payload) {
console.log(user);

    return user;
  }

  @ApiOperation({ summary: 'Create cat' })
  @Public()
  @Get('profile1')
  test() {
    return '1234';
  }
}
