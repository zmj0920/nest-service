// 配置模块
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import dbConfig from './db.config';
export default ConfigModule.forRoot({
  load: [appConfig, dbConfig],
});
