import { useNavigate } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdInputText from '../../../../mui/component/form/MdInputText';
import { useAppDispatch } from '../../../../store/Store';
import { IUserDto } from '../../../user/dto/UserDto';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import AuthService from '../../service/AuthService';
import LoginFacebook from './facebook/LoginFacebook';
import LoginGoogle from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const GOOGLE_CLIENT_ID: string = window['ENV' as keyof Window]['GOOGLE_CLIENT_ID' as keyof Window]?.toString();

const DEFAULT_VALUES = { email: '', password: '' };

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    (data: IUserDto) => {
      AuthService.login(
        data.username as string,
        data.password as string,
      )(dispatch).then(() => {
        navigate('/auth/profile');
      });
    },
    [navigate, dispatch],
  );

  return (
    <MdContent>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <MdCard title='AUTH:LOGIN.TITLE'>
          <MdForm
            initialValues={DEFAULT_VALUES}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
            {(props: IMdFormPropsReturnDto) => (
              <>
                <MdInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label={<Trans i18nKey='AUTH:FIELDS.REMEMBER_ME' />}
                />
                <LoginGoogle />
                <LoginFacebook />
              </>
            )}
          </MdForm>

          <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNUP} />
        </MdCard>
      </GoogleOAuthProvider>
    </MdContent>
  );
};

export default LoginPage;
