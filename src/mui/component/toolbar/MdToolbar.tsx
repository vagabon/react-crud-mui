import { SxProps, Theme, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { useId } from '../../hook/useId';

export interface IMdToolbarProps {
  id?: string;
  sx?: SxProps<Theme>;
  children?: ReactNode;
}

const MdToolbar: React.FC<IMdToolbarProps> = ({ sx, children, ...rest }) => {
  const { id } = useId(rest.id);

  return (
    <Toolbar id={id} sx={sx}>
      {children}
    </Toolbar>
  );
};

export default MdToolbar;
