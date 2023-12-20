import AddIcon from '@mui/icons-material/Add';
import { Fab, PropTypes } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';

export interface IMDFabProps {
  size: 'medium' | 'small';
  color: PropTypes.Color | 'success' | 'error' | 'info' | 'warning';
  label?: string;
  callback?: () => void;
}

const MDFab: React.FC<IMDFabProps> = ({ size, color, label, callback }) => {
  const handleClick = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      event.stopPropagation();
      callback?.();
    },
    [callback],
  );

  return (
    <Fab size={size} color={color} aria-label={label} onClick={handleClick}>
      <AddIcon />
    </Fab>
  );
};

export default MDFab;
