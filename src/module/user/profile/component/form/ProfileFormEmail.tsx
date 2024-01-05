import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import MdInputText, { IMdInputTextProps } from '../../../../../mui/component/form/MdInputText';
import { IYupValidators } from '../../../../../utils/yup/YupUtils';
import CustomModaleForm from '../../../../custom/modale/component/CustomModaleForm';
import { IUserDto } from '../../../user/dto/UserDto';
import { useUser } from '../../../user/hook/useUser';

export interface IProfileFormEmailProps {
  user: IUserDto;
}

const SCHEMA: IYupValidators = {
  email: {
    email: true,
    required: true,
  },
  emailConfirm: {
    email: true,
    required: true,
    same: 'email',
    sameLabel: 'ERRORS:SAME_EMAIL',
  },
};

const ProfileFormEmail: React.FC<IProfileFormEmailProps> = ({ user }) => {
  const { handleUpdateEmail, isUserPassword } = useUser();

  const handleSubmit = useCallback(
    (callback?: () => void) => (data: IUserDto) => {
      handleUpdateEmail(user?.id, data.email as string, callback);
    },
    [user, handleUpdateEmail],
  );

  return (
    <div className='flex flex-row align-center space-between'>
      <b>
        <Trans i18nKey='AUTH:FIELDS.EMAIL' />
      </b>
      <span>{user?.email}</span>
      {isUserPassword(user) && (
        <CustomModaleForm
          small={true}
          title='AUTH:USER.EMAIL.TITLE'
          initialValues={{}}
          validationSchema={SCHEMA}
          onSubmit={handleSubmit}
          button='AUTH:USER.EMAIL.BUTTON'>
          {(props) => (
            <>
              <MdInputText {...(props as IMdInputTextProps)} label='AUTH:FIELDS.EMAIL' name='email' />
              <MdInputText {...(props as IMdInputTextProps)} label='AUTH:FIELDS.EMAIL_CONFIRM' name='emailConfirm' />
            </>
          )}
        </CustomModaleForm>
      )}
    </div>
  );
};

export default ProfileFormEmail;
