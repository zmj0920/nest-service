import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConfigModule from 'src/config';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get('db');
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
