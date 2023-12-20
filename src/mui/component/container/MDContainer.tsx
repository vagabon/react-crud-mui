import { Breakpoint, Container } from '@mui/material';
import { ReactNode } from 'react';

export interface IMDContainerProps {
  maxWidth?: Breakpoint | false;
  children?: ReactNode;
}

const MDContainer: React.FC<IMDContainerProps> = ({ maxWidth, children }) => {
  return <Container maxWidth={maxWidth ?? 'lg'}>{children}</Container>;
};

export default MDContainer;
