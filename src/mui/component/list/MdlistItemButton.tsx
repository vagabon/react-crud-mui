import { ListItemButton } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdlistItemButtonProps {
  callback: () => void;
  children: ReactNode;
}
const MdlistItemButton: React.FC<IMdlistItemButtonProps> = ({ callback, children }) => {
  return <ListItemButton onClick={callback}>{children}</ListItemButton>;
};

export default MdlistItemButton;
