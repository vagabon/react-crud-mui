import { useCallback, useEffect, useState } from 'react';
import { IApiDto } from '../../../dto/api/ApiDto';
import { AdminStateProps } from '../dto/AdminConfDto';
import AdminService from '../service/AdminService';

export const useAdminList = (pageConf: AdminStateProps) => {
  const [search, setSearch] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [datas, setDatas] = useState<IApiDto[]>([]);

  useEffect(() => {
    if (!pageConf) {
      return;
    }
    AdminService.count(pageConf.name, pageConf.findByChamps, search).then((count) => {
      setCount(count);
    });
    AdminService.findBy(
      pageConf.name,
      pageConf.findByChamps,
      search,
      page * pageConf.rowsPerPage,
      pageConf.rowsPerPage,
      pageConf.sortBy,
      pageConf.sortByOrder,
    ).then((datas) => {
      setDatas(datas as IApiDto[]);
    });
  }, [pageConf, search, page]);

  const handleSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const handleTableChange = useCallback(
    (page: number, rowsPerPage: number, sortBy: string, sortByOrder: 'asc' | 'desc') => {
      setPage(page);
    },
    [],
  );

  return { search, count, page, datas, handleSearch, handleTableChange };
};
