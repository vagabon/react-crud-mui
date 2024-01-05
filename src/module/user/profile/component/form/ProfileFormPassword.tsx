import { useCallback } from 'react';
import MdInputText, { IMdInputTextProps } from '../../../../../mui/component/form/MdInputText';
import { IYupValidators } from '../../../../../utils/yup/YupUtils';
import CustomModaleForm from '../../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';

const SCHEMA: IYupValidators = {
  password: {
    type: 'password',
    required: true,
  },
  newPassword: {
    type: 'password',
    required: true,
  },
  newPasswordConfirm: {
    type: 'password',
    required: true,
    same: 'newPassword',
    sameLabel: 'ERRORS:SAME_PASSWORD',
  },
};

export interface IProfileFormPasswordProps {
  user?: IUserDto;
}

const ProfileFormPassword: React.FC<IProfileFormPasswordProps> = ({ user }) => {
  const { handleUpdatePassword } = useUser();

  const handleSubmit = useCallback(
    (callback?: () => void) => (data: IUserDto) => {
      handleUpdatePassword(user?.id, data.password as string, data.newPassword as string, callback);
    },
    [user, handleUpdatePassword],
  );

  return (
    <div className='flex flex-row align-center justify-end'>
      <CustomModaleForm
        small={true}
        title='AUTH:USER.PASSWORD.TITLE'
        initialValues={{}}
        validationSchema={SCHEMA}
        onSubmit={handleSubmit}
        button='AUTH:USER.PASSWORD.BUTTON'>
        {(props) => (
          <>
            <MdInputText {...(props as IMdInputTextProps)} label='AUTH:FIELDS.PASSWORD' name='password' />
            <MdInputText {...(props as IMdInputTextProps)} label='AUTH:FIELDS.PASSWORD_NEW' name='newPassword' />
            <MdInputText
              {...(props as IMdInputTextProps)}
              label='AUTH:FIELDS.PASSWORD_NEW_CONFIRM'
              name='newPasswordConfirm'
            />
          </>
        )}
      </CustomModaleForm>
    </div>
  );
};

export default ProfileFormPassword;
