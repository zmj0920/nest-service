import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import SysUser from 'src/entities/sys-user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser]), CacheModule.register()],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
