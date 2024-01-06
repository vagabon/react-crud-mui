import { Divider } from '@mui/material';
import { Trans } from 'react-i18next';
import HasRole from '../../../../../hook/role/HasRole';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';
import { IProfileDto } from '../../dto/ProfileDto';
import ProfileFormEmail from './ProfileFormEmail';
import ProfileFormPassword from './ProfileFormPassword';

export interface IProfileFormProps {
  user: IUserDto;
  disabled?: boolean;
}

const ProfileForm: React.FC<IProfileFormProps> = ({ user, disabled }) => {
  const { isUserPassword } = useUser();

  return (
    <div className='profile-form'>
      {!disabled && (
        <>
          <Divider />
          <ProfileFormEmail user={user} />
        </>
      )}

      {isUserPassword(user) && !disabled && (
        <>
          <Divider />
          <ProfileFormPassword user={user} />
        </>
      )}

      <HasRole roles={['ADMIN']} showError={false}>
        <Divider />
        <div>
          <b>
            <Trans i18nKey={'AUTH:FIELDS.ROLES'} />:
          </b>
          {user?.profiles?.map((role: IProfileDto) => (
            <span key={role.id}> {role.name} </span>
          ))}
        </div>
      </HasRole>
    </div>
  );
};

export default ProfileForm;
