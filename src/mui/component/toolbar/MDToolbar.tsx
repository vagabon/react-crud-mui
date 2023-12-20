import { SxProps, Theme, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { useId } from '../../hook/useId';

export interface IMDToolbarProps {
  id?: string;
  sx?: SxProps<Theme>;
  children?: ReactNode;
}

const MDToolbar: React.FC<IMDToolbarProps> = ({ sx, children, ...rest }) => {
  const { id } = useId(rest.id);

  return (
    <Toolbar id={id} sx={sx}>
      {children}
    </Toolbar>
  );
};

export default MDToolbar;
