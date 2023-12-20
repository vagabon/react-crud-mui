import { Route, Routes } from 'react-router-dom';
import { TabsType } from '../../mui/component/tabs/MdTabs';
import { IAdminTabConfDto } from './dto/AdminConfDto';
import AdminShowPage from './page/show/AdminShowPage';
import AdminTabsPage from './page/tab/AdminTabPage';

interface IAdminTabsPageProps {
  conf: IAdminTabConfDto;
  tabs: TabsType[];
}

const AdminRouter: React.FC<IAdminTabsPageProps> = ({ conf, tabs }) => {
  return (
    <Routes>
      <Route>
        <Route path='/tab/:tab' element={<AdminTabsPage conf={conf} tabs={tabs} />} />
        <Route path='/update/:page/:id' element={<AdminShowPage conf={conf} />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
