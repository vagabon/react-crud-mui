import { ArrowBackIos } from '@mui/icons-material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AlarmIcon from '@mui/icons-material/Alarm';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import FolderIcon from '@mui/icons-material/Folder';
import GoogleIcon from '@mui/icons-material/Google';
import MovieIcon from '@mui/icons-material/Movie';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCallback } from 'react';

export type IconColorType =
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
  add: { react: (color: IconColorType) => <AddIcon color={color} /> },
  back: { react: (color: IconColorType) => <ArrowBackIos color={color} /> },
  delete: { react: (color: IconColorType) => <DeleteIcon color={color} /> },
  folder: { react: (color: IconColorType) => <FolderIcon color={color} /> },
  settings: { react: (color: IconColorType) => <SettingsIcon color={color} /> },
  shopping: { react: (color: IconColorType) => <ShoppingCartIcon color={color} /> },
  alarm: { react: (color: IconColorType) => <AlarmIcon color={color} /> },
  account: { react: (color: IconColorType) => <AccountBalanceIcon color={color} /> },
  avatar: { react: (color: IconColorType) => <AccountCircleIcon color={color} /> },
  call: { react: (color: IconColorType) => <AddIcCallIcon color={color} /> },
  movie: { react: (color: IconColorType) => <MovieIcon color={color} /> },
  pencil: { react: (color: IconColorType) => <CreateIcon color={color} /> },
  exit: { react: (color: IconColorType) => <ExitToAppIcon color={color} /> },
  google: { react: (color: IconColorType) => <GoogleIcon color={color} /> },
  facebook: { react: (color: IconColorType) => <FacebookIcon color={color} /> },
  personAdd: { react: (color: IconColorType) => <PersonAddIcon color={color} /> },
  search: { react: (color: IconColorType) => <SearchIcon color={color} /> },
  close: { react: (color: IconColorType) => <CloseIcon color={color} /> },
};

export const useIcon = () => {
  const getIcon = useCallback((icon?: string, color?: IconColorType) => {
    const colorOk: IconColorType = color ?? 'inherit';
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
