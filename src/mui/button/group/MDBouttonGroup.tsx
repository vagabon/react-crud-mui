import { ButtonGroup } from '@mui/material';
import { ReactNode } from 'react';

export interface IMDBouttonGroupProps {
  variant: 'text' | 'outlined' | 'contained';
  size: 'small' | 'medium' | 'large';
  children?: ReactNode;
}

const MDBouttonGroup: React.FC<IMDBouttonGroupProps> = ({ variant, size, children }) => {
  return (
    <ButtonGroup variant={variant ?? 'text'} size={size ?? 'large'}>
      {children}
    </ButtonGroup>
  );
};

export default MDBouttonGroup;
