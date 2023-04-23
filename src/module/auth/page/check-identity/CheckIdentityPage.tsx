import React, { useState } from 'react';
import LoginService from '../../service/AuthService';
import { Trans } from 'react-i18next';

import CHECK_IDENTITY_SCHEMA from './schema/check.identity.schema.json';
import { ICheckIdentityDto } from './dto/CheckIdentityDto';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import MDCard from 'mui/card/MDCard';
import MDForm, { IMDFormPropsReturn } from 'mui/form/MDForm';
import MDInputText from 'mui/form/MDInputText';

const DEFAULT_VALUES = { token: '' };

const CheckIdentityPage: React.FC = () => {
  const [state, setState] = useState<boolean>(false);

  const handleCheckIdentity = (data: ICheckIdentityDto) => {
    LoginService.checkIdentityToken(data.token as string).then((data: ICheckIdentityDto) => {
      if (data.token !== '') {
        LoginService.resetPassword(data.token as string).then((data: ICheckIdentityDto) => {
          if (data.token !== '') {
            setState(true);
          }
        });
      }
    });
  };

  return (
    <MDCard title='AUTH:CHECK_IDENTITY.TITLE'>
      {state === false && (
        <MDForm initialValues={DEFAULT_VALUES} validationSchema={CHECK_IDENTITY_SCHEMA} onSubmit={handleCheckIdentity} backButton={false}>
          {(props: IMDFormPropsReturn) => (
            <>
              <MDInputText label='AUTH:FIELDS.CODE' name='token' {...props} />
            </>
          )}
        </MDForm>
      )}
      {state === true && (
        <div>
          <Trans i18nKey='AUTH:CHECK_IDENTITY.SUCCESS' />
          <p>&nbsp;</p>
        </div>
      )}

      <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
    </MDCard>
  );
};

export default CheckIdentityPage;
