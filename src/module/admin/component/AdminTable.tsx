import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JSONObject } from '../../../dto/api/ApiDto';
import MDCard from '../../../mui/card/MDCard';
import MDFab from '../../../mui/fab/MDFab';
import HasRole from '../../../mui/role/HasRole';
import MdSearchBar from '../../../mui/searchbar/MdSearchBar';
import TableWithPagination from '../../../mui/table/MDTableWithPagination';
import { IAdminTabConfDto, IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { useAdminList } from '../hook/useAdminList';
import { useAdminState } from '../hook/useAdminState';

export interface IAdminListPageProps {
  activePage: string;
  conf: IAdminTabConfDto;
}
const AdminTable: React.FC<IAdminListPageProps> = ({ activePage, conf }) => {
  const navigate = useNavigate();

  const [pageConf, setPageConf] = useState<IAdminTabDto>();
  const { state } = useAdminState(activePage, pageConf as IAdminTabDto);

  const { handleSearch, handleTableChange } = useAdminList(
    activePage,
    pageConf as IAdminTabDto,
    state as IAdminStateDto,
  );

  useEffect(() => {
    const pageConf = conf.tabs.find((tab) => tab.name === activePage);
    pageConf && setPageConf(pageConf);
  }, [activePage, conf.tabs]);

  const doCreate = () => {
    navigate('/admin/update/' + activePage + '/-1');
  };

  return (
    <MDCard className='no-margin flexflex1'>
      <HasRole roles={['ADMIN']}>
        <MdSearchBar callBack={handleSearch} search={state?.filter?.search} />
        {pageConf && state && state?.table && (
          <TableWithPagination
            count={state?.count}
            datas={state?.datas as JSONObject[]}
            page={state?.table.page}
            cells={pageConf.cells}
            rowsPerPage={state?.table.rowsPerPage}
            sortBy={state?.table.sortBy}
            sortByOrder={state?.table.sortByOrder}
            url={'/admin/update/' + activePage + '/'}
            callBack={handleTableChange}
          />
        )}
        <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
          <MDFab size='medium' color='primary' aria-label='add' callback={doCreate} />
        </div>
      </HasRole>
    </MDCard>
  );
};

export default AdminTable;
