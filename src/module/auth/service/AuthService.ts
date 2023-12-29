import { Dispatch } from 'redux';
import { ApiService } from '../../../api/service/ApiService';
import { ICurrentUserDto } from '../../../dto/current-user/CurrentUserDto';
import { StorageUtils } from '../../../utils/storage/StorageUtils';
import { IUserDto } from '../../user/dto/UserDto';
import { ICheckIdentityDto } from '../page/check-identity/dto/CheckIdentityDto';
import { LoginAction } from '../reducer/AuthReducers';

const ENDPOINT_USER = '/auth';
const ENDPOINT_SIGNUP = ENDPOINT_USER + '/signup';
const ENDPOINT_SIGNIN = ENDPOINT_USER + '/signin';
const ENDPOINT_ACTIVATION = ENDPOINT_USER + '/activation';
const ENDPOINT_CREATE_IDENTITY_TOKEN = ENDPOINT_USER + '/createIdentityToken';
const ENDPOINT_CHECK_IDENTITY_TOKEN = ENDPOINT_USER + '/checkIdentityToken';
const ENDPOINT_RESET_PASSWORD = ENDPOINT_USER + '/resetPassword';
const ENDPOINT_GOOGLE_CONNECT = ENDPOINT_USER + '/google-connect';
const ENDPOINT_FACEBOOK_CONNECT = ENDPOINT_USER + '/facebook-connect';

const AuthService = {
  register: (username: string, email: string, password: string): Promise<ICurrentUserDto<IUserDto>> => {
    return ApiService.post(ENDPOINT_SIGNUP, {
      username,
      email,
      password,
    });
  },

  login:
    (username: string, password: string) =>
    (dispatch: Dispatch): Promise<ICurrentUserDto<IUserDto>> => {
      return ApiService.post<ICurrentUserDto<IUserDto>>(ENDPOINT_SIGNIN, {
        username,
        password,
      }).then((data: ICurrentUserDto<IUserDto>) => {
        dispatch(LoginAction.setLoginSuccess(data));
        StorageUtils.setCurrentUser(data);
        return data;
      });
    },

  activation: (token: string): Promise<ICurrentUserDto<IUserDto>> => {
    return ApiService.post(ENDPOINT_ACTIVATION, {
      token,
    });
  },

  createIdentityToken: (email: string): Promise<ICurrentUserDto<IUserDto>> => {
    return ApiService.post(ENDPOINT_CREATE_IDENTITY_TOKEN, {
      email,
    });
  },

  checkIdentityToken: (token: string): Promise<ICheckIdentityDto> => {
    return ApiService.post<ICheckIdentityDto>(ENDPOINT_CHECK_IDENTITY_TOKEN, {
      token,
    });
  },

  resetPassword: (token: string): Promise<ICheckIdentityDto> => {
    return ApiService.post<ICheckIdentityDto>(ENDPOINT_RESET_PASSWORD, {
      token,
    });
  },

  googleConnect: (googleToken: string): Promise<ICurrentUserDto<IUserDto>> => {
    return ApiService.post<ICurrentUserDto<IUserDto>>(ENDPOINT_GOOGLE_CONNECT, {
      googleToken,
    });
  },
  facebookConnect: (accessToken: string): Promise<ICurrentUserDto<IUserDto>> => {
    return ApiService.post<ICurrentUserDto<IUserDto>>(ENDPOINT_FACEBOOK_CONNECT, {
      accessToken,
    });
  },

  logout: () => (dispatch: Dispatch) => {
    StorageUtils.removeCurrentUser();
    dispatch(LoginAction.setLoginError());
  },
};

export default AuthService;
