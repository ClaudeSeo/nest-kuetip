import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import type { JsonObject } from 'type-fest';

@Schema({
  read: 'secondaryPreferred',
  timestamps: true,
})
export class Tip {
  /** ID */
  _id: mongoose.Types.ObjectId;

  /** UUID */
  @Prop()
  uuid: string;

  /** 제목 */
  @Prop()
  title: string;

  /** URL */
  @Prop()
  url: string;

  /** 이미지 */
  @Prop({
    type: String,
    required: false,
    default: null,
  })
  image: string | null;

  /** 설명 */
  @Prop({
    type: String,
    required: false,
    default: null,
  })
  description: string | null;

  /** 기타 정보 */
  @Prop({
    type: mongoose.Schema.Types.Mixed,
    required: false,
    default: null,
  })
  etc: JsonObject | null;

  /** 활성화 여부 */
  @Prop({
    default: true,
  })
  active: boolean;

  /** 생성일 */
  createdAt: Date;

  /** 수정일 */
  updatedAt: Date;
}

export type TipDocument = Tip & mongoose.Document;
export const TipSchema = SchemaFactory.createForClass(Tip);
