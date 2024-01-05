import { ListItemButton } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdListItemButtonProps {
  callback?: () => void;
  children: ReactNode;
}
const MdListItemButton: React.FC<IMdListItemButtonProps> = ({ callback, children }) => {
  return <ListItemButton onClick={callback}>{children}</ListItemButton>;
};

export default MdListItemButton;
