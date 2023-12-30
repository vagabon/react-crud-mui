import { ArrowBackIos } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';

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

export const useIcon = () => {
  const getIcon = (icon?: string, color?: ColorType) => {
    const colorOk: ColorType = color ?? 'primary';
    switch (icon) {
      case 'add':
        return <AddIcon color={colorOk} />;
      case 'back':
        return <ArrowBackIos color={colorOk} />;
      case 'delete':
        return <DeleteIcon color={colorOk} />;
      case 'folder':
        return <FolderIcon color={colorOk} />;
      case 'settings':
        return <SettingsIcon color={colorOk} />;
      default:
        return undefined;
    }
  };

  return { getIcon };
};
