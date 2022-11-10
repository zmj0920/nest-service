import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DeptModule } from '../dept/dept.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/contants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DeptModule,
    CacheModule.register(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
