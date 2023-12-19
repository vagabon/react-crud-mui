import { Route, Routes } from 'react-router-dom';
import { TabsType } from '../../mui/tabs/MDTabs';
import { IAdminConfDto } from './dto/AdminConfDto';
import AdminTabsPage from './page/tab/AdminTabPage';

interface IAdminTabsPageProps {
  conf: IAdminConfDto;
  tabs: TabsType[];
}

const AdminRouter: React.FC<IAdminTabsPageProps> = ({ conf, tabs }) => {
  return (
    <Routes>
      <Route>
        <Route path='/tab/:tab' element={<AdminTabsPage conf={conf} tabs={tabs} />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
