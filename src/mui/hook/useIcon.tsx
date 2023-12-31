import { ArrowBackIos } from '@mui/icons-material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AlarmIcon from '@mui/icons-material/Alarm';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import FolderIcon from '@mui/icons-material/Folder';
import GoogleIcon from '@mui/icons-material/Google';
import MovieIcon from '@mui/icons-material/Movie';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCallback } from 'react';

export type ColorType =
  | 'inherit'
  | 'action'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export const ICONS = {
  add: { react: (color: ColorType) => <AddIcon color={color} /> },
  back: { react: (color: ColorType) => <ArrowBackIos color={color} /> },
  delete: { react: (color: ColorType) => <DeleteIcon color={color} /> },
  folder: { react: (color: ColorType) => <FolderIcon color={color} /> },
  settings: { react: (color: ColorType) => <SettingsIcon color={color} /> },
  shopping: { react: (color: ColorType) => <ShoppingCartIcon color={color} /> },
  alarm: { react: (color: ColorType) => <AlarmIcon color={color} /> },
  account: { react: (color: ColorType) => <AccountBalanceIcon color={color} /> },
  avatar: { react: (color: ColorType) => <AccountCircleIcon color={color} /> },
  call: { react: (color: ColorType) => <AddIcCallIcon color={color} /> },
  movie: { react: (color: ColorType) => <MovieIcon color={color} /> },
  pencil: { react: (color: ColorType) => <CreateIcon color={color} /> },
  exit: { react: (color: ColorType) => <ExitToAppIcon color={color} /> },
  google: { react: (color: ColorType) => <GoogleIcon color={color} /> },
  facebook: { react: (color: ColorType) => <FacebookIcon color={color} /> },
};

export const useIcon = () => {
  const getIcon = useCallback((icon?: string, color?: ColorType) => {
    const colorOk: ColorType = color ?? 'inherit';
    let iconReact = undefined;
    Object.entries(ICONS).forEach(([key, data]) => {
      if (key === icon) {
        iconReact = data.react(colorOk);
      }
    });
    return iconReact;
  }, []);

  return { getIcon };
};
