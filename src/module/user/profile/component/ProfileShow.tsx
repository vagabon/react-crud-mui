import React from 'react';
import { ID } from '../../../../dto/api/ApiDto';
import { useUserAuth } from '../../../../hook/user/useUserAuth';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import { useAppSelector } from '../../../../store/Store';
import CustomModaleConfirm from '../../../custom/modale/component/CustomModaleConfirm';
import { IUserDto } from '../../user/dto/UserDto';
import ProfileAvatar from './ProfileAvatar';
import ProfileForm from './form/ProfileForm';

export interface IProfileShowProps {
  user: IUserDto;
  disabled?: boolean;
  profileReact: (id: ID) => React.JSX.Element;
}

const ProfileShow: React.FC<IProfileShowProps> = ({ user, disabled, profileReact }) => {
  const { handleLogout } = useUserAuth();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  return (
    <MdContent className='flex1 profil-content'>
      <MdCard
        title={'-- ' + user?.username + ' --'}
        buttonchildren={
          <>
            {currentUser?.user?.id === user.id && !disabled && (
              <CustomModaleConfirm button='COMMON:LOGOUT' buttonColor='error' callback={handleLogout} />
            )}
          </>
        }>
        <div className='flex align-center' style={{ flex: '0.4' }}>
          <ProfileAvatar user={user} disabled={disabled} />
        </div>
        <div className='flex flex1'>
          {profileReact(user.id)}
          <ProfileForm user={user} disabled={disabled} />
        </div>
      </MdCard>
    </MdContent>
  );
};

export default ProfileShow;
