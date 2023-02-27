import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import {
  // 守卫
  APP_GUARD,
  // 过滤器
  APP_FILTER,
  // 管道
  APP_PIPE,
  // 缓存
  APP_INTERCEPTOR,
} from '@nestjs/core';
import ConfigModule from 'src/config';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { LogInterceptor } from './common/interceptors/log.interceptor';
import { DatabaseModule } from './database.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { DeptModule } from './modules/dept/dept.module';
import { DictTypeModule } from './modules/dict-type/dict-type.module';
import { DictModule } from './modules/dict/dict.module';
import { EventsModule } from './modules/events/events.module';
import { LoginLogModule } from './modules/login-log/login-log.module';
import { OperLogModule } from './modules/oper-log/oper-log.module';
import { PostModule } from './modules/post/post.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
// 模块加载

// 全局 性质
export const ProviderModules = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true, // 启用白名单，dto中没有声明的属性自动过滤
      transform: true, // 自动类型转换
    }),
  },
  /* 操作日志拦截器 。 注：拦截器中的 handle 从下往上执行（ReponseTransformInterceptor ----> OperationLogInterceptor），返回值值依次传递 */
  {
    provide: APP_INTERCEPTOR,
    useClass: LogInterceptor,
  },
  {
    // 全局异常过滤器 主要为了http请求返回格式统一
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  // {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  // },
  // 全局缓存
  // {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CacheInterceptor,
  // },
];

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EventsModule,
    UserModule,
    RoleModule,
    PostModule,
    OperLogModule,
    LoginLogModule,
    DictModule,
    DictTypeModule,
    DeptModule,
    AuthModule,
  ],
  controllers: [],
  providers: [...ProviderModules],
  exports: [],
})
export class AppModule { }
