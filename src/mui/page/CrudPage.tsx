import { Fab } from '@mui/material';
import React, { ReactNode, SyntheticEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export interface CrudPageProps {
  className?: string;
  urlAdd?: string;
  children: ReactNode;
  doCreate?: () => void;
}

const CrudPage: React.FC<CrudPageProps> = (props: CrudPageProps) => {
  const navigate = useNavigate();

  const doCreate = (event: SyntheticEvent<Element, Event>) => {
    event.stopPropagation();
    if (props.doCreate) {
      props.doCreate();
    } else {
      if (props.urlAdd) {
        navigate(props.urlAdd);
      }
    }
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 5,
    right: 10,
  };

  return (
    <>
      <div className='main-container'>
        <div className={'flex container ' + props.className}>{props.children}</div>
      </div>
      {(props.urlAdd || props.doCreate) && (
        <div style={{ position: 'relative', display: 'flex', alignSelf: 'end' }}>
          <Fab size='medium' color='primary' aria-label='add' sx={fabStyle} onClick={doCreate}>
            <AddIcon />
          </Fab>
        </div>
      )}
    </>
  );
};

export default CrudPage;
