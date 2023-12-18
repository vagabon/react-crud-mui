import { useCallback } from 'react';
import ApiService from '../../../api/service/ApiService';
import { ID } from '../../../dto/api/ApiDto';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { INewsDto } from '../dto/NewsDto';
import { NewsAction } from '../reducer/NewsReducers';
import NewsService from '../service/NewsService';

export const useCreateNews = (): {
  news: INewsDto;
  createOrUpdateNews: (news: INewsDto) => void;
  fetchById: (id: ID) => void;
  uploadNewsImage: (id: ID, file: File | undefined) => Promise<string>;
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
    (news: INewsDto) => {
      NewsService.createOrUpdate(news)(dispatch);
    },
    [dispatch],
  );

  const uploadNewsImage = useCallback((id: ID, file: File | undefined): Promise<string> => {
    console.log(id, file);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    return ApiService.post('/news/upload?id=' + id, formData, {
      'Content-Type': 'multipart/form-data',
    });
  }, []);

  return { news, fetchById, createOrUpdateNews, uploadNewsImage };
};
