import { Grid } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

interface IMDGrid {
  children: ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: boolean;
  style?: CSSProperties;
}

const MDGrid: React.FC<IMDGrid> = ({ children, ...rest }: IMDGrid) => {
  return <Grid {...rest}>{children}</Grid>;
};

export default MDGrid;
