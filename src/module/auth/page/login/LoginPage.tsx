import React from 'react';
import { useNavigate } from 'react-router-dom';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LoginService from '../../service/AuthService';
import { IUserDto } from '../../../user/dto/UserDto';
import { useAppDispatch } from '../../../../store/store';
import LOGIN_SCHEMA from './schema/login.schema.json';
import { Trans } from 'react-i18next';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginGoogle from './google/LoginGoogle';
import LoginFacebook from './facebook/LoginFacebook';
import MDCard from 'mui/card/MDCard';
import MDForm, { IMDFormPropsReturn } from 'mui/form/MDForm';
import MDInputText from 'mui/form/MDInputText';

const GOOGLE_CLIENT_ID: string = window['ENV' as any]['GOOGLE_CLIENT_ID' as any]?.toString();

const DEFAULT_VALUES = { email: '', password: '' };

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = (data: IUserDto) => {
    LoginService.login(
      data.username as string,
      data.password as string,
    )(dispatch).then(() => {
      navigate('/auth/profile');
    });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <MDCard title='AUTH:LOGIN.TITLE'>
        <MDForm initialValues={DEFAULT_VALUES} validationSchema={LOGIN_SCHEMA} onSubmit={handleLogin} backButton={false}>
          {(props: IMDFormPropsReturn) => (
            <>
              <MDInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
              <MDInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label={<Trans i18nKey='AUTH:FIELDS.REMEMBER_ME' />}
              />
              <LoginGoogle />
              <LoginFacebook />
            </>
          )}
        </MDForm>

        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNUP} />
      </MDCard>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
