import { Dispatch } from 'redux';
import ApiService from '../../../api/service/ApiService';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { IUserDto } from '../dto/UserDto';

const ENDPOINT_TEST_ALL = '/user/ping';
const ENDPOINT_USERS_FINDBY = '/user/findBy';
const ENDPOINT_USERS_COUNTBY = '/user/countBy';
const ENDPOINT_USERS_FINDBY_ID = '/user';
const ENDPOINT_USERS_UPDATE = '/user/';

const UserService = {
  getPublicContent: (): Promise<string> => {
    return ApiService.get(ENDPOINT_TEST_ALL);
  },

  loadUsers: (filter: IUserDto, first: number, max: number, orderField: string, order: string): Promise<IUserDto[]> => {
    return ApiService.findBy<IUserDto[]>(
      ENDPOINT_USERS_FINDBY,
      'username%And|Email%',
      filter.search + ',' + filter.search,
      first,
      max,
      orderField,
      order,
    );
  },

  countUsers: (search: string): Promise<number> => {
    return ApiService.countBy(ENDPOINT_USERS_COUNTBY, 'username%And|Email%', search + ',' + search);
  },

  loadUser: (id: string | undefined): Promise<IUserDto> => {
    return ApiService.findById<IUserDto>(ENDPOINT_USERS_FINDBY_ID, id);
  },

  create: (data: IUserDto) => (dispatch: Dispatch) => {
    return ApiService.post(ENDPOINT_USERS_UPDATE, data).then(() => {
      dispatch(CommonAction.setMessage({ message: 'Création OK', type: 'success' }));
    });
  },

  update: (data: IUserDto) => (dispatch: Dispatch) => {
    return ApiService.put(ENDPOINT_USERS_UPDATE, data).then(() => {
      dispatch(CommonAction.setMessage({ message: 'Sauvegarde OK', type: 'success' }));
    });
  },
};

export default UserService;
