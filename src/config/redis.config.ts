import { registerAs } from '@nestjs/config';
export default registerAs('redis', () => ({
  // host: process.env.REDIS_HOST || '127.0.0.1',
  // port: parseInt(process.env.REDIS_PORT || '6379', 10),
  // password: process.env.REDIS_PASSWORD || '123456',
  // db: process.env.REDIS_DB || '0',
  config: {
    url: 'redis://:123456@localhost:6379/0',
  },
}));
