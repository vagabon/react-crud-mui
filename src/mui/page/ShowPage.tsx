import { ReactNode, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IApiDto, ID } from '../../dto/api/ApiDto';
import { useAppDispatch } from '../../store/Store';

export interface ShowPageProps {
  data: IApiDto;
  fetchData: (id: ID) => void;
  children: ReactNode;
}

const ShowPage: React.FC<ShowPageProps> = (props: ShowPageProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const fetchData = useRef(props.fetchData);

  useEffect(() => {
    id && fetchData.current(id);
  }, [dispatch, id]);

  return <>{props.data && props.children}</>;
};

export default ShowPage;
