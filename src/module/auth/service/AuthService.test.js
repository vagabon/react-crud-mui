import { ApiService } from '../../../api/service/ApiService';
import AuthService from './AuthService';

describe('AuthService', () => {
  test('Given AuthService when register then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.register('username', 'email', 'password');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when login then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.login('username', 'password')(mockDispatch);
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when activation then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.activation('email');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when checkIdentityToken then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.checkIdentityToken('token');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when resetPassword then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.resetPassword('token');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when googleConnect then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.googleConnect('googleToken');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when facebookConnect then ApiService is called', () => {
    const mockService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    AuthService.facebookConnect('accessToken');
    expect(mockService).toBeCalledTimes(1);
  });

  test('Given AuthService when logout then ApiService is called', () => {
    AuthService.logout();
  });
});
