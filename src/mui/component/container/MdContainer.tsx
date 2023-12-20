import { Breakpoint, Container } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdContainerProps {
  maxWidth?: Breakpoint | false;
  children?: ReactNode;
}

const MdContainer: React.FC<IMdContainerProps> = ({ maxWidth, children }) => {
  return <Container maxWidth={maxWidth ?? 'lg'}>{children}</Container>;
};

export default MdContainer;
