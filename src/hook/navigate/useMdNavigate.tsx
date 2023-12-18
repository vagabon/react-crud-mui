import { useNavigate, useParams } from 'react-router-dom';

export const useMdNavigate = () => {
  const navigate = useNavigate();

  return { navigate };
};

export const useMdParams = () => {
  const params = useParams();

  return { params };
};
