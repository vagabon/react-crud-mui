import { useCallback, useEffect } from 'react';
import { IApiDto } from '../../../dto/api/ApiDto';
import { useAppDispatch } from '../../../store/Store';
import { IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { AdminAction } from '../reducer/AdminReducer';
import AdminService from '../service/AdminService';

export const useAdminList = (activePage: string, pageConf: IAdminTabDto, state: IAdminStateDto) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pageConf || !state?.filter || pageConf.name !== activePage) {
      return;
    }
    AdminService.count(pageConf.name, pageConf.findByChamps, state.filter.search).then((count) => {
      dispatch(AdminAction.setCount({ activePage, count }));
    });
    AdminService.findBy(
      pageConf.name,
      pageConf.findByChamps,
      state.filter.search,
      state.table.page * state.table.rowsPerPage,
      state.table.rowsPerPage,
      state.table.sortBy,
      state.table.sortByOrder,
    ).then((datas) => {
      dispatch(AdminAction.setDatas({ activePage, datas: datas as IApiDto[] }));
    });
  }, [dispatch, activePage, pageConf, state?.filter, state?.table]);

  const handleSearch = useCallback(
    (search: string) => {
      dispatch(AdminAction.setFilter({ activePage, filter: { search: search } }));
    },
    [dispatch, activePage],
  );

  const handleTableChange = useCallback(
    (page: number, rowsPerPage: number, sortBy: string, sortByOrder: 'asc' | 'desc') => {
      dispatch(AdminAction.setPage({ activePage, table: { page, rowsPerPage, sortBy, sortByOrder } }));
    },
    [dispatch, activePage],
  );

  return { handleSearch, handleTableChange };
};
