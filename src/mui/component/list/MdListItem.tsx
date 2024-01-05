import { ListItem } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdListItemProps {
  component?: React.ElementType;
  disablePadding?: boolean;
  callback?: () => void;
  children: ReactNode;
}
const MdListItem: React.FC<IMdListItemProps> = ({ component, disablePadding, callback, children }) => {
  return (
    <ListItem component={component ?? 'div'} disablePadding={disablePadding ?? true} onClick={callback}>
      {children}
    </ListItem>
  );
};

export default MdListItem;
