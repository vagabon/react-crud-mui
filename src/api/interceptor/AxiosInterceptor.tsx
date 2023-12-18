import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { LoginAction } from '../../module/auth/reducer/AuthReducers';
import { CommonAction } from '../../reducer/common/CommonReducers';
import { StorageUtils } from '../../utils/storage/StorageUtils';

const AxiosInterceptor = <U,>(
  store: EnhancedStore,
  apiUrl: string,
  publicApi: string,
  loginEnpoint: string,
  refreshTokenEndPoint: string,
) => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      store.dispatch(CommonAction.setLoading(true));
      store.dispatch(CommonAction.clearMessage());

      const token = StorageUtils.getJwt();
      if (
        token &&
        config.headers &&
        !config.url?.includes('/auth/') &&
        !config.url?.includes(loginEnpoint) &&
        !config.url?.includes(refreshTokenEndPoint) &&
        !config.url?.includes(publicApi) &&
        !config.url?.includes('/ping')
      ) {
        config.headers = { ...config.headers, ['Authorization' as string]: 'Bearer ' + token } as AxiosHeaders;
      }
      return config;
    },
    (error: AxiosError) => {
      store.dispatch(CommonAction.setLoading(false));
      console.log(error);
      return error;
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      store.dispatch(CommonAction.setLoading(false));
      try {
        console.log(response.config.url, JSON.parse(response.config.data), response.status, response.data);
      } catch (e) {
        console.log(response.config.url, response.config.data, response.status, response.data);
      }
      return response;
    },
    async (error: AxiosError<U>) => {
      console.log(error);
      store.dispatch(CommonAction.setLoading(false));
      const originalRequest: InternalAxiosRequestConfig | undefined = error.config;

      const message: string = ((error.response?.data && error.response?.data['debugMessage' as keyof U]) ||
        error.message ||
        JSON.stringify(error)) as string;

      store.dispatch(CommonAction.setMessage({ message, type: 'error' }));

      if (
        error.response &&
        error.response.status === 401 &&
        originalRequest &&
        originalRequest.url !== apiUrl + loginEnpoint &&
        !originalRequest['_retry' as keyof InternalAxiosRequestConfig]
      ) {
        originalRequest['_retry' as keyof InternalAxiosRequestConfig] = 'true';

        const user: ICurrentUserDto<U> | null = StorageUtils.getCurrentUser<U>();
        if (user) {
          axios.defaults.headers.common['Authorization'] = '';
          const data = await axios.post(apiUrl + refreshTokenEndPoint, {
            refreshToken: user.jwtRefresh,
          });
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.jwt;
          StorageUtils.setCurrentUser(data.data);
          return axios(originalRequest);
        }
      } else {
        if (error.response && error.response.status === 401) {
          store.dispatch(LoginAction.setLoginError());
          window.location.href = 'auth/signin';
        }
        return error;
      }
    },
  );
};

export default AxiosInterceptor;
