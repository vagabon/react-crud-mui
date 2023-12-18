import { Action } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { IApiDto, JSONObject } from '../dto/api/ApiDto';
import { useAppDispatch } from '../store/store';

interface ISearchPageHook {
  fetchDatas: (filter: JSONObject, first: number, max: number, orderField: string, order: string) => Promise<IApiDto[]>;
  countDatas: (search: string) => Promise<number>;
  action: {
    setDatas: (state: IApiDto[]) => Action;
    setPage: (page: number) => Action;
    setSearch: (state: string) => Action;
    setCount: (state: number) => Action;
  };
  search: string;
  page: number;
  order: string;
  orderBy: string;
}

const useSearchPageHook = ({
  fetchDatas,
  countDatas,
  action,
  search,
  page,
  order,
  orderBy,
}: ISearchPageHook): [(page: number) => void, (search: string) => void, boolean] => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const featchAdminUsers = (search: string, page: number = 1): void => {
    setIsFetching(true);
    fetchDatas({ search }, (page - 1) * 10, 10, order, orderBy).then((datas: IApiDto[]) => {
      setIsFetching(false);
      dispatch(action.setDatas(datas));
    });
  };

  const [featchAdminUsersOnLoad] = useState<(search: string, page: number) => void>(() => featchAdminUsers);
  const [countDatasOnLoad] = useState<(search: string) => Promise<number>>(() => countDatas);
  const [pageOnLoad] = useState<number>(page);
  const [searchOnLoad] = useState<string>(search);
  const [actionOnLoad] = useState<{
    setDatas: (state: IApiDto[]) => Action;
    setPage: (page: number) => Action;
    setSearch: (state: string) => Action;
    setCount: (state: number) => Action;
  }>(action);

  useEffect(() => {
    countDatasOnLoad(searchOnLoad).then((count: number): void => {
      dispatch(actionOnLoad.setCount(count));
      featchAdminUsersOnLoad(searchOnLoad, pageOnLoad);
    });
  }, [dispatch, featchAdminUsersOnLoad, countDatasOnLoad, actionOnLoad, pageOnLoad, searchOnLoad]);

  const changePage = (page: number): void => {
    dispatch(action.setPage(page));
    featchAdminUsers(search, page);
  };

  const doSearch = (search: string): void => {
    dispatch(action.setPage(1));
    dispatch(action.setSearch(search));
    countDatas(search).then((count: number): void => {
      dispatch(action.setCount(count));
      featchAdminUsers(search, 1);
    });
  };

  return [changePage, doSearch, isFetching];
};

export default useSearchPageHook;
