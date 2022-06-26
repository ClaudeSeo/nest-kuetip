import { Tip } from '../entity/index.js';

export interface TipRepository {
  /** 팁 생성 요청 */
  create(url: string): Promise<Tip>;

  /** 팁 목록 조회 */
  findAll(): Promise<Tip[]>;

  /** 팁 개수 조회 */
  getCount(): Promise<number>;
}

export const TIP_REPOSITORY = Symbol('TIP_REPOSITORY');
