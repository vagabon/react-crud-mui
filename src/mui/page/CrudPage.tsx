import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { ReactNode, SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface CrudPageProps {
  className?: string;
  urlAdd?: string;
  children: ReactNode;
  doCreate?: () => void;
}

const CrudPage: React.FC<CrudPageProps> = (props: CrudPageProps) => {
  const navigate = useNavigate();

  const doCreate = useCallback(
    (callback?: () => void) => (event: SyntheticEvent<Element, Event>) => {
      event.stopPropagation();
      if (callback) {
        callback();
      } else if (props.urlAdd) {
        navigate(props.urlAdd);
      }
    },
    [props.urlAdd, navigate],
  );

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
          <Fab size='medium' color='primary' aria-label='add' sx={fabStyle} onClick={doCreate(props.doCreate)}>
            <AddIcon />
          </Fab>
        </div>
      )}
    </>
  );
};

export default CrudPage;
