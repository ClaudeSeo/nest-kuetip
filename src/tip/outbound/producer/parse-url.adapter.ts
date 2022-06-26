import { Injectable } from '@nestjs/common';
import { ParseUrlPort } from '../../domain/ports/index.js';

@Injectable()
export class ParseUrlAdapter implements ParseUrlPort {
  async sendMessage(uuid: string, url: string): Promise<void> {
    // @TODO: 추후 작성
    console.log(`send ${uuid} / ${url}`);
  }
}
