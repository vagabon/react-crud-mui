import { useParams } from 'react-router-dom';
import NewsForm from '../component/form/NewsForm';
import { useCreateNews } from '../hook/useCreateNews';
import { useEffect } from 'react';
import HasRole from 'mui/role/HasRole';

const NewsUpdatePage: React.FC = () => {
  const params = useParams();
  const { fetchById } = useCreateNews();

  useEffect(() => {
    fetchById(params.id);
  }, [params.id, fetchById]);

  return (
    <HasRole roles={['ADMIN']}>
      <NewsForm />
    </HasRole>
  );
};

export default NewsUpdatePage;
