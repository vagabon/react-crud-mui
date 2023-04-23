import { Box } from '@mui/material';
import { ICurrentUserDto } from 'dto/current-user/CurrentUserDto';
import { IUserDto } from 'module/user/dto/UserDto';
import { ReactNode } from 'react';
import { useAppSelector } from 'store/store';
import RoleUtils from 'utils/role/RoleUtils';

export interface HasRoleProps {
  roles: string[];
  showError?: boolean;
  children: ReactNode;
}

const HasRole: React.FC<HasRoleProps> = (props: HasRoleProps) => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);

  return (
    <>
      {RoleUtils.hasProfile(currentUser, props.roles) && props.children}
      {!RoleUtils.hasProfile(currentUser, props.roles) && props.showError && (
        <Box sx={{ marginTop: '20px' }}>Vous n'être pas habilité à voir ce contenu.</Box>
      )}
    </>
  );
};

HasRole.defaultProps = {
  showError: true,
};

export default HasRole;
