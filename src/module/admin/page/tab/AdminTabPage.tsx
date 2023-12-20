import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MdContent from '../../../../mui/component/content/MdContent';
import HasRole from '../../../../mui/component/role/HasRole';
import MdTabs, { TabsType } from '../../../../mui/component/tabs/MdTabs';
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
    <MdContent className='margin-5'>
      <HasRole roles={['ADMIN']}>
        {activeTab && <MdTabs value={activeTab} callback={handleChange} tabs={tabs} />}
        {activeTab && <AdminTable activePage={activeTab} conf={conf} />}
      </HasRole>
    </MdContent>
  );
};

export default AdminTabsPage;
