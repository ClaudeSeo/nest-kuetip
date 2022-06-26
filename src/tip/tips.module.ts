import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../infrastructure/config/environment.constant.js';
import { Tip, TipSchema } from './domain/entity/index.js';
import { PARSE_URL_PORT, TIP_REPOSITORY } from './domain/ports/index.js';
import { CreateTipUseCase, FindTipUseCase } from './domain/use-case/index.js';
import { TipController } from './inbound/api/index.js';
import { TipRepositoryAdapter } from './outbound/persistence/index.js';
import { ParseUrlAdapter } from './outbound/producer/index.js';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Tip.name,
          schema: TipSchema,
        },
      ],
      DATABASE_CONNECTION_NAME.MAIN,
    ),
  ],
  controllers: [TipController],
  providers: [
    {
      provide: PARSE_URL_PORT,
      useClass: ParseUrlAdapter,
    },
    {
      provide: TIP_REPOSITORY,
      useClass: TipRepositoryAdapter,
    },
    CreateTipUseCase,
    FindTipUseCase,
  ],
})
export class TipsModule {}
