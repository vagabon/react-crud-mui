import { IApiDto } from '../../../dto/api/ApiDto';

export interface IProfileDto extends IApiDto {
  name?: string;
  roles?: string;
  search?: string;
}
