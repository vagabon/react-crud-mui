import { CardMedia } from '@mui/material';
import MdAvatar from '../../../../mui/component/avatar/MdAvatar';
import MdFormFile from '../../../../mui/component/form/MdFormFile';
import CustomModaleForm from '../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../../user/dto/UserDto';

export interface IProfileAvatarProps {
  user: IUserDto;
}

const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ user }) => {
  return (
    <>
      {user.username && (
        <CardMedia>
          <MdAvatar
            name={user.username}
            image={user.avatar}
            sx={{ height: '200px', width: '200px', fontSize: '10rem' }}
          />
        </CardMedia>
      )}

      <CustomModaleForm
        small={true}
        title='AUTH:PROFILE.UPDATE_AVATAR'
        initialValues={{}}
        validationSchema={{}}
        onSubmit={() => {}}
        button='AUTH:PROFILE.BUTTONS.UPDATE_AVATAR'>
        {(props) => <MdFormFile label='Avatar' name='avatar' handleChangeFile={() => {}} {...props} />}
      </CustomModaleForm>
    </>
  );
};

export default ProfileAvatar;
