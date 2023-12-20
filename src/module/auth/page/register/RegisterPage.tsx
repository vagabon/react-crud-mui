import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { JSONObject } from '../../../../dto/api/ApiDto';
import { useAppSelector } from '../../../../store/Store';
import { IRegisterDto, RegisterDto } from './dto/RegisterDto';

import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdInputText from '../../../../mui/component/form/MdInputText';
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
    <MdContent>
      <MdCard title='AUTH:REGISTER.TITLE'>
        {!isRegister && (
          <MdForm
            initialValues={DEFAULT_VALUES}
            validationSchema={REGISTER_SCHEMA}
            onSubmit={handleLogin}
            backButton={false}>
            {(props: IMdFormPropsReturnDto) => (
              <>
                <MdInputText label='AUTH:FIELDS.LOGIN' name='username' {...props} />
                <MdInputText label='AUTH:FIELDS.EMAIL' name='email' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD' name='password' type='password' {...props} />
                <MdInputText label='AUTH:FIELDS.PASSWORD_CONFIRM' name='password2' type='password' {...props} />
              </>
            )}
          </MdForm>
        )}
        {isRegister && <Trans i18nKey='AUTH:REGISTER.SUCCESS' />}
        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
      </MdCard>
    </MdContent>
  );
};

export default RegisterPage;
