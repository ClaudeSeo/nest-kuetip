export interface ParseUrlPort {
  /**
   * URL 파싱 메시지 발행
   *
   * @param uuid - TIP UUID
   * @param url - URL
   */
  sendMessage(uuid: string, url: string): Promise<void>;
}

export const PARSE_URL_PORT = Symbol('PARSE_URL_PORT');
