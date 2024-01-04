import { useNavigate } from 'react-router-dom';

import { IUserDto } from '../../../user/user/dto/UserDto';
import AuthService from '../../service/AuthService';

import { useCallback } from 'react';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdInputText from '../../../../mui/component/form/MdInputText';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import FORGET_PASSWORD_SCHEMA from './schema/forget.password.schema.json';

const DEFAULT_VALUES = { email: '' };

const ForgetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const handleForgetPassword = useCallback(
    (data: IUserDto) => {
      AuthService.createIdentityToken(data.email as string).then(() => {
        navigate('/auth/check/identity');
      });
    },
    [navigate],
  );

  return (
    <MdContent>
      <MdCard title='AUTH:FORGET_PASSWORD.TITLE'>
        <MdForm
          initialValues={DEFAULT_VALUES}
          validationSchema={FORGET_PASSWORD_SCHEMA}
          onSubmit={handleForgetPassword}
          backButton={false}>
          {(props: IMdFormPropsReturnDto) => <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />}
        </MdForm>

        <AuthFooter left={AuthFooterEnum.SIGNIN} rigth={AuthFooterEnum.SIGNUP} />
      </MdCard>
    </MdContent>
  );
};

export default ForgetPasswordPage;
