import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdBoxProps {
  component: React.ElementType;
  sx: SxProps<Theme>;
  children: ReactNode;
}

const MdBox: React.FC<IMdBoxProps> = ({ component, sx, children }) => {
  return (
    <Box component={component} sx={sx}>
      {children}
    </Box>
  );
};

export default MdBox;
