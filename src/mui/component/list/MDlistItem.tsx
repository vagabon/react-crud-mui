import { ListItem } from '@mui/material';
import { ReactNode } from 'react';

export interface IMDlistItemProps {
  component?: React.ElementType;
  disablePadding?: boolean;
  children: ReactNode;
}
const MDlistItem: React.FC<IMDlistItemProps> = ({ component, disablePadding, children }) => {
  return (
    <ListItem component={component ?? 'div'} disablePadding={disablePadding ?? true}>
      {children}
    </ListItem>
  );
};

export default MDlistItem;
