import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService>(ConfigService);
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  await app.listen(configService.get<number>('port', 3000));
}

bootstrap();
