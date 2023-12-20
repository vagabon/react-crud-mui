import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MDContent from '../../../../mui/component/content/MDContent';
import HasRole from '../../../../mui/component/role/HasRole';
import MDTabs, { TabsType } from '../../../../mui/component/tabs/MDTabs';
import AdminTable from '../../component/AdminTable';
import { IAdminTabConfDto } from '../../dto/AdminConfDto';

interface IAdminTabsPageProps {
  conf: IAdminTabConfDto;
  tabs: TabsType[];
}

const AdminTabsPage: React.FC<IAdminTabsPageProps> = ({ conf, tabs }) => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    setActiveTab(tab ?? conf.tabs[0].name);
  }, [tab, conf]);

  const handleChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab);
      navigate('/admin/tab/' + newTab);
    },
    [navigate],
  );

  return (
    <MDContent className='margin-5'>
      <HasRole roles={['ADMIN']}>
        {activeTab && <MDTabs value={activeTab} callback={handleChange} tabs={tabs} />}
        {activeTab && <AdminTable activePage={activeTab} conf={conf} />}
      </HasRole>
    </MDContent>
  );
};

export default AdminTabsPage;
