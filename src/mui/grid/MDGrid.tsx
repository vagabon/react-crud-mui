import { Grid } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export interface IMDGridProps {
  children: ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: boolean;
  style?: CSSProperties;
}

const MDGrid: React.FC<IMDGridProps> = ({ children, ...rest }) => {
  return <Grid {...rest}>{children}</Grid>;
};

export default MDGrid;
