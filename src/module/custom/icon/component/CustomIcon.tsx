import { IconButton } from '@mui/material';
import { MouseEvent, useCallback } from 'react';
import { IconColorType, useIcon } from '../../../../mui/hook/useIcon';

export interface ICustomIconProps {
  icon: string;
  color?: IconColorType;
  disabled?: boolean;
  callback?: () => void;
}

const CustomIcon: React.FC<ICustomIconProps> = ({ icon, color, disabled, callback }) => {
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
