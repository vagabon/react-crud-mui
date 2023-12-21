import { useEffect, useState } from 'react';
import { JSONObject } from '../../../dto/api/ApiDto';
import MdCard from '../../../mui/component/card/MdCard';
import MdFabAdd from '../../../mui/component/fab/MdFabAdd';
import HasRole from '../../../mui/component/role/HasRole';
import MdSearchBar from '../../../mui/component/searchbar/MdSearchBar';
import MdTableWithPagination from '../../../mui/component/table/MdTableWithPagination';
import { IAdminTabConfDto, IAdminTabDto } from '../dto/AdminConfDto';
import { IAdminStateDto } from '../dto/AdminReducerDto';
import { useAdminList } from '../hook/useAdminList';
import { useAdminState } from '../hook/useAdminState';

export interface IAdminListPageProps {
  activePage: string;
  conf: IAdminTabConfDto;
}
const AdminTable: React.FC<IAdminListPageProps> = ({ activePage, conf }) => {
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

  return (
    <>
      <MdCard className='no-margin flexflex1'>
        <HasRole roles={['ADMIN']}>
          <MdSearchBar callBack={handleSearch} search={state?.filter?.search} />
          {pageConf && state && state?.table && (
            <MdTableWithPagination
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
        </HasRole>
      </MdCard>
      <MdFabAdd urlAdd={'/admin/update/' + activePage + '/-1'} urlAddRole={['ADMIN']} />
    </>
  );
};

export default AdminTable;
