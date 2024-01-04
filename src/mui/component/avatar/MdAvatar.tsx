import { Avatar, IconButton, SxProps, Theme } from '@mui/material';
import { MouseEvent, useCallback } from 'react';
import { useMdNavigate } from '../../../hook/navigate/useMdNavigate';
import { ObjectUtils } from '../../../utils/object/ObjectUtils';
import { WindowUtils } from '../../../utils/window/WindowUtils';

const API_URL: string = WindowUtils.getEnv('API_URL');

export interface IMdAvatarProps {
  name: string;
  image?: string;
  disabled?: boolean;
  url?: string;
  sx?: SxProps<Theme>;
  callback?: () => void;
}

const MdAvatar: React.FC<IMdAvatarProps> = ({ name, image, disabled, url, sx, callback }) => {
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

  const getImage = useCallback((image: string) => {
    if (!image.startsWith('http://') && !image.startsWith('https://')) {
      return API_URL + '/download?fileName=' + image;
    }
    return image;
  }, []);

  return (
    <IconButton edge='end' aria-label='delete' onClick={handleClick} disabled={disabled}>
      {image && image !== '' ? (
        <Avatar alt={name} src={getImage(image)} sx={sx} />
      ) : (
        <Avatar color='secondary' sx={sx}>
          {ObjectUtils.capitalize(name[0])}
        </Avatar>
      )}
    </IconButton>
  );
};

export default MdAvatar;
