import React from 'react';
import { useNavigate } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MDCard from 'mui/card/MDCard';
import MDContent from 'mui/content/MDContent';
import MDForm, { IMDFormPropsReturn } from 'mui/form/MDForm';
import MDInputText from 'mui/form/MDInputText';
import { Trans } from 'react-i18next';
import { useAppDispatch } from '../../../../store/store';
import { IUserDto } from '../../../user/dto/UserDto';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import LoginService from '../../service/AuthService';
import LoginFacebook from './facebook/LoginFacebook';
import LoginGoogle from './google/LoginGoogle';
import LOGIN_SCHEMA from './schema/login.schema.json';

const GOOGLE_CLIENT_ID: string = window['ENV' as keyof Window]['GOOGLE_CLIENT_ID' as keyof Window]?.toString();

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
    <MDContent>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <MDCard title='AUTH:LOGIN.TITLE'>
          <MDForm
            initialValues={DEFAULT_VALUES}
            validationSchema={LOGIN_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
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
    </MDContent>
  );
};

export default LoginPage;
