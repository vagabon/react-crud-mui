import { List } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdlistProps {
  className?: string;
  children: ReactNode;
}
const Mdlist: React.FC<IMdlistProps> = ({ className, children }) => {
  return <List className={className ?? 'modalList'}>{children}</List>;
};

export default Mdlist;
