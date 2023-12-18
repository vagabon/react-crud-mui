import { List } from '@mui/material';
import { ReactNode } from 'react';

export interface IMDListProps {
  className?: string;
  children: ReactNode;
}
const MDList: React.FC<IMDListProps> = ({ className, children }) => {
  return <List className={className ?? 'modalList'}>{children}</List>;
};

export default MDList;
