import { Body, Controller, Get, Post } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import {
  CreateTipUseCase,
  FindTipUseCase,
} from '../../domain/use-case/index.js';
import { FindTipResponse } from '../../interfaces/index.js';
import { CreateTipRequestDto } from '../dto/index.js';

@Controller({
  path: 'tips',
  version: '1',
})
export class TipController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly createTipUseCase: CreateTipUseCase,
    private readonly findTipUseCase: FindTipUseCase,
  ) {
    this.logger.setContext(TipController.name);
  }

  /**
   * 팁 생성 API
   *
   * @param request - 요청 전문
   */
  @Post()
  async createTip(@Body() request: CreateTipRequestDto): Promise<void> {
    await this.createTipUseCase.handle(request);
  }

  /**
   * 팁 목록 조회
   *
   * @returns
   */
  @Get()
  async findTips(): Promise<FindTipResponse> {
    return await this.findTipUseCase.handle();
  }
}
