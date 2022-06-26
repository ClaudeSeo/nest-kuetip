import { Injectable, Inject } from '@nestjs/common';
import { CreateTipRequest } from '../../interfaces/index.js';
import { Tip } from '../entity/index.js';
import {
  TipRepository,
  ParseUrlPort,
  TIP_REPOSITORY,
  PARSE_URL_PORT,
} from '../ports/index.js';

@Injectable()
export class CreateTipUseCase {
  constructor(
    @Inject(PARSE_URL_PORT) private readonly parseUrlPort: ParseUrlPort,
    @Inject(TIP_REPOSITORY) private readonly tipsRepository: TipRepository,
  ) {}

  /**
   * TIP 생성
   *
   * @param request - 요청 전문
   */
  async handle(request: CreateTipRequest): Promise<Tip> {
    const tip = await this.tipsRepository.create(request.url);
    await this.parseUrlPort.sendMessage(tip.uuid, tip.url);
    return tip;
  }
}
