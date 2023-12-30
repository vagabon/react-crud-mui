import { IconButton } from '@mui/material';
import { MouseEvent, useCallback } from 'react';
import { ColorType, useIcon } from '../../../../mui/hook/useIcon';

export interface ICustomIcon {
  icon: string;
  color?: ColorType;
  disabled?: boolean;
  callback?: () => void;
}

const CustomIcon: React.FC<ICustomIcon> = ({ icon, color, disabled, callback }) => {
  const { getIcon } = useIcon();

  const handleClickIcon = useCallback(
    (event: MouseEvent | MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      event.preventDefault();
      callback?.();
    },
    [callback],
  );

  return (
    <IconButton edge='end' aria-label='delete' onClick={handleClickIcon} disabled={disabled}>
      {getIcon(icon, color)}
    </IconButton>
  );
};

export default CustomIcon;
