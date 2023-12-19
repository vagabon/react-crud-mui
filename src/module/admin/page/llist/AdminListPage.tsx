import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MDCard from '../../../../mui/card/MDCard';
import MDContent from '../../../../mui/content/MDContent';
import MDFab from '../../../../mui/fab/MDFab';
import HasRole from '../../../../mui/role/HasRole';
import SearchBar from '../../../../mui/searchbar/SearchBar';
import TableWithPagination from '../../../../mui/table/TableWithPagination';
import { AdminStateProps, IAdminConfDto } from '../../dto/AdminConfDto';
import { useAdminList } from '../../hook/useAdminList';

interface IAdminListPageProps {
  activePage: string;
  conf: IAdminConfDto;
}
const AdminListPage: React.FC<IAdminListPageProps> = ({ activePage, conf }) => {
  const navigate = useNavigate();

  const [pageConf, setPageConf] = useState<AdminStateProps>();
  const { search, count, page, datas, handleSearch, handleTableChange } = useAdminList(pageConf as AdminStateProps);

  useEffect(() => {
    const pageConf = conf.tabs.find((tab) => tab.name === activePage);
    pageConf && setPageConf(pageConf);
  }, [activePage, conf.tabs]);

  const doCreate = () => {
    navigate('/admin/update/' + activePage + '/-1');
  };

  return (
    <MDContent>
      <MDCard>
        <HasRole roles={['ADMIN']}>
          <SearchBar callBack={handleSearch} search={search} />
          {pageConf && (
            <TableWithPagination
              count={count}
              datas={datas}
              page={page}
              cells={pageConf.cells}
              rowsPerPage={pageConf.rowsPerPage}
              sortBy={pageConf.sortBy}
              sortByOrder={pageConf.sortByOrder}
              url={'/admin/update/' + activePage + '/'}
              callBack={handleTableChange}
            />
          )}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
            <MDFab size='medium' color='primary' aria-label='add' callback={doCreate} />
          </div>
        </HasRole>
      </MDCard>
    </MDContent>
  );
};

export default AdminListPage;
