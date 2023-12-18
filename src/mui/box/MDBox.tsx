import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export interface IMDBoxProps {
  component: React.ElementType;
  sx: SxProps<Theme>;
  children: ReactNode;
}

const MDBox: React.FC<IMDBoxProps> = ({ component, sx, children }) => {
  return (
    <Box component={component} sx={sx}>
      {children}
    </Box>
  );
};

export default MDBox;
