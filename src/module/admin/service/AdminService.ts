import { Dispatch } from 'redux';
import ApiService from '../../../api/service/ApiService';
import { IApiDto, JSONObject } from '../../../dto/api/ApiDto';
import { CommonAction } from '../../../reducer/common/CommonReducer';

const ENDPOINT_FINDBY = '/findBy';
const ENDPOINT_COUNTBY = '/countBy';
const ENDPOINT_FINDBY_ID = '/';
const ENDPOINT_CREATE = '/';
const ENDPOINT_UPDATE = '/';

const AdminService = {
  findBy: (
    endPoint: string,
    champs: string,
    value: string,
    first: number,
    max: number,
    orderField: string,
    order: string,
  ): Promise<JSON[]> => {
    const orderString = order === 'asc' ? '' : 'Desc';
    const orderConst = orderField ? '>>' + orderField + orderString : '';
    const values = value + ',' + value + ',' + value + ',' + value + ',' + value;
    return ApiService.get<JSON[]>(
      '/' +
        endPoint +
        ENDPOINT_FINDBY +
        encodeURI('?fields=' + champs + orderConst + '&values=' + values + '&first=' + first + '&max=' + max),
    ).then(
      (data: JSON[]) => {
        return Promise.resolve(data);
      },
      () => {
        return Promise.resolve([]);
      },
    );
  },

  count: (endPoint: string, champs: string, value: string): Promise<number> => {
    const values = value + ',' + value + ',' + value + ',' + value + ',' + value;
    return ApiService.get<{ count: number }>(
      '/' + endPoint + ENDPOINT_COUNTBY + encodeURI('?fields=' + champs + '&values=' + values),
    ).then(
      (data: { count: number }) => {
        return Promise.resolve(data.count);
      },
      () => {
        return Promise.resolve(-1);
      },
    );
  },

  findById: (endPoint: string, id: string | undefined): Promise<JSONObject> => {
    return ApiService.get<JSONObject>('/' + endPoint + ENDPOINT_FINDBY_ID + id).then(
      (data: JSONObject) => {
        return Promise.resolve(data);
      },
      () => {
        return Promise.resolve({});
      },
    );
  },

  create:
    (endPoint: string, data: IApiDto) =>
    (dispatch: Dispatch): Promise<IApiDto> => {
      return ApiService.post<IApiDto>('/' + endPoint + ENDPOINT_CREATE, data).then((dataNew: IApiDto) => {
        dispatch(CommonAction.setMessage({ message: 'Création OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    },

  update:
    (endPoint: string, data: IApiDto) =>
    (dispatch: Dispatch): Promise<IApiDto> => {
      return ApiService.put<IApiDto>('/' + endPoint + ENDPOINT_UPDATE, data).then((dataNew: IApiDto) => {
        dispatch(CommonAction.setMessage({ message: 'Sauvegarde OK', type: 'success' }));
        return Promise.resolve(dataNew);
      });
    },
};

export default AdminService;
