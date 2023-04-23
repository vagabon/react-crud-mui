import { ICurrentUserDto } from 'dto/current-user/CurrentUserDto';
import { IUserDto } from 'module/user/dto/UserDto';

const RoleUtils = {
  hasProfile: (currentUser: ICurrentUserDto<IUserDto> | null, profiles: string[] | undefined): boolean => {
    let hasProfile: boolean = false;
    if (profiles === undefined || profiles.length === 0 || profiles[0] === '') {
      return true;
    }
    if (currentUser && currentUser.user) {
      profiles.forEach((role: string) => {
        if (currentUser?.user?.profiles?.find((userProfile) => userProfile.name === role)) {
          hasProfile = true;
        }
      });
    }
    return hasProfile;
  },
};

export default RoleUtils;
