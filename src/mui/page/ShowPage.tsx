import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IApiDto, ID } from '../../dto/api/ApiDto';
import { useAppDispatch } from '../../store/Store';

export interface ShowPageProps {
  data: IApiDto;
  children: ReactNode;
  fetchData: (id: ID) => void;
}

const ShowPage: React.FC<ShowPageProps> = (props: ShowPageProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id !== undefined) {
      props.fetchData(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params.id]);

  return <>{props.data && props.children}</>;
};

export default ShowPage;
