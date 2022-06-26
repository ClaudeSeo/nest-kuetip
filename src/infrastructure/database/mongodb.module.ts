import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  DATABASE_CONNECTION_NAME,
  ENV,
} from '../config/environment.constant.js';
import mongodbConfiguration from '../config/mongodb.environment.js';

@Module({
  imports: [
    ConfigModule.forFeature(mongodbConfiguration),
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME.MAIN,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get(DATABASE_CONNECTION_NAME.MAIN),
    }),
  ],
})
export class MongoDBModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const env = this.configService.get<string>('env', ENV.DEVELOPMENT);
    if (env === ENV.DEVELOPMENT) {
      mongoose.default.set('debug', true);
    }
  }
}
