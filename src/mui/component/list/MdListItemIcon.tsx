import { ListItemIcon } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdListItemIconProps {
  children: ReactNode;
}

const MdListItemIcon: React.FC<IMdListItemIconProps> = ({ children }) => {
  return <ListItemIcon>{children}</ListItemIcon>;
};

export default MdListItemIcon;
