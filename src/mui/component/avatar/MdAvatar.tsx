import { Avatar, IconButton } from '@mui/material';
import { MouseEvent, useCallback } from 'react';
import { useMdNavigate } from '../../../hook/navigate/useMdNavigate';
import { ObjectUtils } from '../../../utils/object/ObjectUtils';

export interface IMdAvatarProps {
  name: string;
  image?: string;
  disabled?: boolean;
  url?: string;
  callback?: () => void;
}

const MdAvatar: React.FC<IMdAvatarProps> = ({ name, image, disabled, url, callback }) => {
  const { navigate } = useMdNavigate();
  const handleClick = useCallback(
    (event: MouseEvent | MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      event.preventDefault();
      url && navigate(url);
      callback?.();
    },
    [url, navigate, callback],
  );

  return (
    <IconButton edge='end' aria-label='delete' onClick={handleClick} disabled={disabled}>
      {image && image !== '' ? (
        <Avatar alt={name} src={image} />
      ) : (
        <Avatar color='secondary'>{ObjectUtils.capitalize(name[0])}</Avatar>
      )}
    </IconButton>
  );
};

export default MdAvatar;
