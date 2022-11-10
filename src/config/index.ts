// 配置模块
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import dbConfig from './db.config';
import redisConfig from './redis.config';
export default ConfigModule.forRoot({
  load: [appConfig, dbConfig, redisConfig],
});
