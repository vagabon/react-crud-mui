import { ICurrentUserDto } from 'dto/current-user/CurrentUserDto';
import { IUserDto } from 'module/user/dto/UserDto';
import { useCallback } from 'react';
import { useAppSelector } from 'store/store';
import RoleUtils from 'utils/role/RoleUtils';

export const useRole = () => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);

  const hasUserRole = useCallback(
    (roles: string[]) => {
      return RoleUtils.hasProfile(currentUser, roles);
    },
    [currentUser],
  );

  return { currentUser, hasUserRole };
};
