import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { INewsDto } from '../dto/NewsDto';
import NewsService from '../service/NewsService';
import { NewsAction } from '../reducer/NewsReducers';
import { ID } from 'dto/api/ApiDto';
import ApiService from 'api/service/ApiService';

export const useCreateNews = (): {
  news: INewsDto;
  createOrUpdateNews: (file: File | undefined) => (news: INewsDto) => void;
  fetchById: (id: ID) => void;
} => {
  const { data: news } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  const fetchById = useCallback(
    (id: ID) => {
      id &&
        NewsService.fetchById(id).then((data) => {
          dispatch(NewsAction.setData(data));
        });
      !id && dispatch(NewsAction.setData({}));
    },
    [dispatch],
  );

  const createOrUpdateNews = useCallback(
    (file: File | undefined) => (news: INewsDto) => {
      NewsService.createOrUpdate(news)(dispatch).then((newFromBack) => {
        if (file && !newFromBack.image?.includes(file.name)) {
          let formData = new FormData();
          formData.append('file', file);
          ApiService.post('/news/upload?id=' + news.id, formData, {
            'Content-Type': 'multipart/form-data',
          }).then((data) => {
            console.log(data);
          });
        }
      });
    },
    [dispatch],
  );

  return { news, fetchById, createOrUpdateNews };
};
