import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/store';
import { IRegisterDto, RegisterDto } from './dto/RegisterDto';
import { JSONObject } from 'dto/api/ApiDto';

import REGISTER_SCHEMA from './schema/register.schema.json';
import AuthService from '../../service/AuthService';
import { Trans } from 'react-i18next';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import MDCard from 'mui/card/MDCard';
import MDForm, { IMDFormPropsReturn } from 'mui/form/MDForm';
import MDInputText from 'mui/form/MDInputText';

const DEFAULT_VALUES: JSONObject = new RegisterDto() as JSONObject;

const RegisterPage: React.FC = () => {
  let navigate = useNavigate();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (data: IRegisterDto) => {
    if (data.username && data.email && data.password) {
      AuthService.register(data.username, data.email, data.password).then(() => {
        setIsRegister(true);
      });
    }
  };

  return (
    <MDCard title='AUTH:REGISTER.TITLE'>
      {!isRegister && (
        <MDForm initialValues={DEFAULT_VALUES} validationSchema={REGISTER_SCHEMA} onSubmit={handleLogin} backButton={false}>
          {(props: IMDFormPropsReturn) => (
            <>
              <MDInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
              <MDInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />
              <MDInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
              <MDInputText label='AUTH:FIELDS.PASSWORD_CONFIRM' name='password2' type='password' {...props} />
            </>
          )}
        </MDForm>
      )}
      {isRegister && <Trans i18nKey='AUTH:REGISTER.SUCCESS' />}
      <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
    </MDCard>
  );
};

export default RegisterPage;
