import { ListItemButton } from '@mui/material';
import { ReactNode } from 'react';

export interface IMDlistItemButtonProps {
  callback: () => void;
  children: ReactNode;
}
const MDlistItemButton: React.FC<IMDlistItemButtonProps> = ({ callback, children }) => {
  return <ListItemButton onClick={callback}>{children}</ListItemButton>;
};

export default MDlistItemButton;
