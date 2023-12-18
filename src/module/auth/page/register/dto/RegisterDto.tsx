import { IApiDto } from '../../../../../dto/api/ApiDto';

export interface IRegisterDto extends IApiDto {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export class RegisterDto implements IRegisterDto {
  username = '';
  email = '';
  password = '';
  password2 = '';
}
