import { IApiDto } from '../../../dto/api/ApiDto';
import { IProfileDto } from './ProfileDto';

export interface IUserDto extends IApiDto {
  username?: string;
  email?: string;
  password?: string;
  profiles?: IProfileDto[];
  search?: '';
}
