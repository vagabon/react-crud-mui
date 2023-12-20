import { Grid } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export interface IMdGridProps {
  children: ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: boolean;
  style?: CSSProperties;
}

const MdGrid: React.FC<IMdGridProps> = ({ children, ...rest }) => {
  return <Grid {...rest}>{children}</Grid>;
};

export default MdGrid;
