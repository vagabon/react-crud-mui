import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { JSONObject } from '../../../../dto/api/ApiDto';
import { useAppSelector } from '../../../../store/store';
import { IRegisterDto, RegisterDto } from './dto/RegisterDto';

import MDCard from '../../../../mui/card/MDCard';
import MDContent from '../../../../mui/content/MDContent';
import MDForm, { IMDFormPropsReturn } from '../../../../mui/form/MDForm';
import MDInputText from '../../../../mui/form/MDInputText';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import AuthService from '../../service/AuthService';
import REGISTER_SCHEMA from './schema/register.schema.json';

const DEFAULT_VALUES: JSONObject = new RegisterDto() as JSONObject;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
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
    <MDContent>
      <MDCard title='AUTH:REGISTER.TITLE'>
        {!isRegister && (
          <MDForm
            initialValues={DEFAULT_VALUES}
            validationSchema={REGISTER_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
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
    </MDContent>
  );
};

export default RegisterPage;
