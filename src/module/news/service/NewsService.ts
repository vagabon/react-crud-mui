import { Dispatch } from 'redux';
import ApiService from '../../../api/service/ApiService';
import { ID } from '../../../dto/api/ApiDto';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { INewsDto } from '../dto/NewsDto';

const ENDPOINT_NEWS = '/news';
const ENDPOINT_NEWS_FINDBY = '/news/findBy';
const ENDPOINT_NEWS_COUNTBY = '/news/countBy';

const NewsService = {
  fetchNews: (filter: INewsDto, first: number, max: number, orderField: string, order: string): Promise<INewsDto[]> => {
    const champs = '(title%And|Description%)';
    const values = filter.search + ',' + filter.search;
    return ApiService.findBy<INewsDto[]>(ENDPOINT_NEWS_FINDBY, champs, values, first, max, orderField, order);
  },

  countNews: (filter: INewsDto): Promise<number> => {
    const champs = '(title%And!Description%)';
    const values = filter.search + ',' + filter.search;
    return ApiService.countBy(ENDPOINT_NEWS_COUNTBY, champs, values);
  },

  fetchById: (id: ID): Promise<INewsDto> => {
    return ApiService.findById<INewsDto>(ENDPOINT_NEWS, id);
  },

  createOrUpdate:
    (data: INewsDto) =>
    (dispatch: Dispatch): Promise<INewsDto> => {
      if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
        return ApiService.put<INewsDto>(ENDPOINT_NEWS + '/', data).then((dataNew: INewsDto) => {
          dispatch(CommonAction.setMessage({ message: 'Sauvegarde OK', type: 'success' }));
          return Promise.resolve(dataNew);
        });
      } else {
        return ApiService.post<INewsDto>(ENDPOINT_NEWS + '/', data).then((dataNew: INewsDto) => {
          dispatch(CommonAction.setMessage({ message: 'Création OK', type: 'success' }));
          return Promise.resolve(dataNew);
        });
      }
    },
};

export default NewsService;
