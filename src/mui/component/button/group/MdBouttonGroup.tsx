import { ButtonGroup } from '@mui/material';
import { ReactNode } from 'react';

export interface IMdBouttonGroupProps {
  variant: 'text' | 'outlined' | 'contained';
  size: 'small' | 'medium' | 'large';
  children?: ReactNode;
}

const MdBouttonGroup: React.FC<IMdBouttonGroupProps> = ({ variant, size, children }) => {
  return (
    <ButtonGroup variant={variant ?? 'text'} size={size ?? 'large'}>
      {children}
    </ButtonGroup>
  );
};

export default MdBouttonGroup;
