import { IsString, IsUrl } from 'class-validator';
import { CreateTipRequest } from '../../interfaces/index.js';

export class CreateTipRequestDto implements CreateTipRequest {
  @IsUrl({
    require_protocol: true,
  })
  @IsString()
  url: string;
}
