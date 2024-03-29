import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ID, JSON } from '../../dto/api/ApiDto';
import { WindowUtils } from '../../utils/window/WindowUtils';

const API_URL: string = WindowUtils.getEnv('API_URL');

export const ApiService = {
  get: <T>(endPoint: string, baseUrl: string = API_URL): Promise<T> => {
    return axios.get(baseUrl + endPoint).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  put: <T>(endPoint: string, data: T): Promise<T> => {
    return axios.put(API_URL + endPoint, data).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  post: <T>(
    endPoint: string,
    data: T,
    config: JSON = {
      'Content-Type': 'application/json',
    },
  ): Promise<T> => {
    return axios.post(API_URL + endPoint, data, config).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  patch: <T>(endPoint: string, data: T): Promise<T> => {
    return axios.patch(API_URL + endPoint, data).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  delete: <T>(endPoint: string): Promise<T> => {
    return axios.delete(API_URL + endPoint).then(
      (response: AxiosResponse) => {
        return ApiService.returnPromise<T>(response);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  },

  returnPromise: <T>(response: AxiosResponse<T, AxiosRequestConfig>): Promise<T> => {
    if (response.data) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },

  findById: <T>(endPoint: string, id: ID): Promise<T> => {
    return ApiService.get<T>(endPoint + '/' + id).then(
      (data: T) => {
        return Promise.resolve(data);
      },
      () => {
        return Promise.resolve({} as T);
      },
    );
  },

  findBy: <T>(
    endPoint: string,
    champs: string,
    values: string,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ) => {
    const orderType: string = order === 'asc' ? '' : 'Desc';
    const orderConst: string = orderField ? '>>' + orderField + orderType : '';
    const champsComplete = champs + orderConst;
    return ApiService.get<T>(
      endPoint + encodeURI('?fields=' + champsComplete + '&values=' + values + '&first=' + first + '&max=' + max),
    ).then(
      (data: T) => {
        return Promise.resolve(data);
      },
      () => {
        return Promise.resolve({} as T);
      },
    );
  },

  countBy: (endPoint: string, champs: string, values: string) => {
    return ApiService.get<{ count: number }>(endPoint + encodeURI('?fields=' + champs + '&values=' + values)).then(
      (data: { count: number }) => {
        return Promise.resolve(data.count);
      },
      () => {
        return Promise.resolve(0);
      },
    );
  },
};
