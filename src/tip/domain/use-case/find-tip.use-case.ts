import { Injectable, Inject } from '@nestjs/common';
import { FindTipResponse } from '../../interfaces/index.js';
import { TipRepository, TIP_REPOSITORY } from '../ports/index.js';

@Injectable()
export class FindTipUseCase {
  constructor(
    @Inject(TIP_REPOSITORY) private readonly tipsRepository: TipRepository,
  ) {}

  async handle(): Promise<FindTipResponse> {
    const [items, totalCount] = await Promise.all([
      this.tipsRepository.findAll(),
      this.tipsRepository.getCount(),
    ]);

    return {
      items,
      totalCount,
    };
  }
}
