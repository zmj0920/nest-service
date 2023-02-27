import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { usePlugs } from './plugs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  // 添加插件
  usePlugs(app);

  // 全局过滤器
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

  // 设置前缀
  // app.setGlobalPrefix('api');

  await app.listen(3000);
  const serverUrl = await app.getUrl();
  Logger.log(`api服务已经启动,请访问: ${serverUrl}`);
  Logger.log(`API文档已生成,请访问: ${serverUrl}/api/`);
}
bootstrap();
