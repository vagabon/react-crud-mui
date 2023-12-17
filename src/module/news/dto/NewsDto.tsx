import { IApiDto } from 'dto/api/ApiDto';
import { IUserDto } from 'module/user/dto/UserDto';

export interface INewsDto extends IApiDto {
  title?: string;
  avatar?: string;
  image?: string;
  description?: string;
  user?: IUserDto;
  search?: string;
}
