import { MongooseModuleOptions } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from './environment.constant.js';

export default (): Record<DATABASE_CONNECTION_NAME, MongooseModuleOptions> => ({
  main: {
    uri: process.env.MAIN_DB_URI ?? 'mongodb://127.0.0.1:27017/kue-tips',
    minPoolSize: Number(process.env.MAIN_DB_POOL_SIZE ?? '5'),
    autoIndex: false,
  },
});
