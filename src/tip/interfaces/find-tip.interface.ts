import { Tip } from '../domain/entity/index.js';

export interface FindTipResponse {
  /** 아이템 목록 */
  items: Tip[];

  /** 총 개수 */
  totalCount: number;
}
