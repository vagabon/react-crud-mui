import { ListItem } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdlistItemProps {
  component?: React.ElementType;
  disablePadding?: boolean;
  children: ReactNode;
}
const MdlistItem: React.FC<IMdlistItemProps> = ({ component, disablePadding, children }) => {
  return (
    <ListItem component={component ?? 'div'} disablePadding={disablePadding ?? true}>
      {children}
    </ListItem>
  );
};

export default MdlistItem;
