import React from 'react';
import { useNavigate } from 'react-router-dom';

import LoginService from '../../service/AuthService';
import { IUserDto } from '../../../user/dto/UserDto';

import FORGET_PASSWORD_SCHEMA from './schema/forget.password.schema.json';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import MDCard from 'mui/card/MDCard';
import MDForm, { IMDFormPropsReturn } from 'mui/form/MDForm';
import MDInputText from 'mui/form/MDInputText';

const DEFAULT_VALUES = { email: '' };

const ForgetPasswordPage: React.FC = () => {
  let navigate = useNavigate();

  const handleForgetPassword = (data: IUserDto) => {
    LoginService.createIdentityToken(data.email as string).then(() => {
      navigate('/auth/check/identity');
    });
  };

  return (
    <MDCard title='AUTH:FORGET_PASSWORD.TITLE'>
      <MDForm initialValues={DEFAULT_VALUES} validationSchema={FORGET_PASSWORD_SCHEMA} onSubmit={handleForgetPassword} backButton={false}>
        {(props: IMDFormPropsReturn) => (
          <>
            <MDInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />
          </>
        )}
      </MDForm>

      <AuthFooter left={AuthFooterEnum.SIGNIN} rigth={AuthFooterEnum.SIGNUP} />
    </MDCard>
  );
};

export default ForgetPasswordPage;
