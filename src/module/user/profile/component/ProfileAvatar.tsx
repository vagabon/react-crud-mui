import { CardMedia } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { IApiDto, JSONObject } from '../../../../dto/api/ApiDto';
import MdAvatar from '../../../../mui/component/avatar/MdAvatar';
import MdFormFile from '../../../../mui/component/form/MdFormFile';
import { ObjectUtils } from '../../../../utils/object/ObjectUtils';
import { useCustomFormUpload } from '../../../custom/form/hook/useCustomFormUpload';
import CustomModaleForm from '../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../user/dto/UserDto';
import { useUser } from '../../user/hook/useUser';

export interface IProfileAvatarProps {
  user: IUserDto;
  disabled?: boolean;
}

const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ user, disabled }) => {
  const { handleUpdateAvatar, isUserPassword } = useUser();

  const { handleChangeFile } = useCustomFormUpload('user');

  const callbackFile = useCallback(
    (callback?: () => void) => (event: ChangeEvent<JSONObject>) => {
      const avatar = ObjectUtils.getDtoString(event.target as IApiDto, 'value');
      handleUpdateAvatar(avatar, callback);
    },
    [handleUpdateAvatar],
  );

  return (
    <>
      {user.username && (
        <CardMedia>
          <MdAvatar
            name={user.username}
            image={user.avatar}
            sx={{ height: disabled ? '100px' : '200px', width: disabled ? '100px' : '200px', fontSize: '10rem' }}
          />
        </CardMedia>
      )}
      {isUserPassword(user) && !disabled && (
        <CustomModaleForm
          small={true}
          title='AUTH:USER.AVATAR.TITLE'
          initialValues={{}}
          validationSchema={{}}
          button='AUTH:USER.AVATAR.BUTTON'>
          {(props) => (
            <MdFormFile
              label='Avatar'
              name='avatar'
              handleChangeFile={handleChangeFile(user.id, callbackFile(props.closeModal))}
              {...props}
            />
          )}
        </CustomModaleForm>
      )}
    </>
  );
};

export default ProfileAvatar;
