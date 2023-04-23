import { Route, Routes } from 'react-router-dom';
import NewsUpdatePage from './page/NewsUpdatePage';

const NewsRouter: React.FC = () => {
  return (
    <Routes>
      <Route>
        <Route path='/add' element={<NewsUpdatePage />} />
        <Route path='/update/:id' element={<NewsUpdatePage />} />
      </Route>
    </Routes>
  );
};

export default NewsRouter;
