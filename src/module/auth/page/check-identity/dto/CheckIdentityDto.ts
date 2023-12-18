import { IApiDto } from '../../../../../dto/api/ApiDto';

export interface ICheckIdentityDto extends IApiDto {
  token?: string;
}
