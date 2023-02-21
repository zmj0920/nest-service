import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DeptModule } from '../dept/dept.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DeptModule,
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
