import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useRole } from './useRole';

export interface HasRoleProps {
  roles: string[];
  showError?: boolean;
  children: ReactNode;
}

const HasRole: React.FC<HasRoleProps> = (props: HasRoleProps) => {
  const { hasUserRole } = useRole();

  return (
    <>
      {hasUserRole(props.roles) && props.children}
      {!hasUserRole(props.roles) && props.showError && (
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>Vous n&apos;êtes pas habilité à voir ce contenu.</Box>
      )}
    </>
  );
};

HasRole.defaultProps = {
  showError: true,
};

export default HasRole;
