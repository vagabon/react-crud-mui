import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IUserDto } from '../../../user/dto/UserDto';
import LoginService from '../../service/AuthService';

import MDCard from '../../../../mui/card/MDCard';
import MDContent from '../../../../mui/content/MDContent';
import MDForm, { IMDFormPropsReturn } from '../../../../mui/form/MDForm';
import MDInputText from '../../../../mui/form/MDInputText';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import FORGET_PASSWORD_SCHEMA from './schema/forget.password.schema.json';

const DEFAULT_VALUES = { email: '' };

const ForgetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const handleForgetPassword = (data: IUserDto) => {
    LoginService.createIdentityToken(data.email as string).then(() => {
      navigate('/auth/check/identity');
    });
  };

  return (
    <MDContent>
      <MDCard title='AUTH:FORGET_PASSWORD.TITLE'>
        <MDForm
          initialValues={DEFAULT_VALUES}
          validationSchema={FORGET_PASSWORD_SCHEMA}
          onSubmit={handleForgetPassword}
          backButton={false}>
          {(props: IMDFormPropsReturn) => <MDInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />}
        </MDForm>

        <AuthFooter left={AuthFooterEnum.SIGNIN} rigth={AuthFooterEnum.SIGNUP} />
      </MDCard>
    </MDContent>
  );
};

export default ForgetPasswordPage;
