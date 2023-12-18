import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import MDCard from '../../../../mui/card/MDCard';
import MDContent from '../../../../mui/content/MDContent';
import MDForm, { IMDFormPropsReturn } from '../../../../mui/form/MDForm';
import MDInputText from '../../../../mui/form/MDInputText';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import LoginService from '../../service/AuthService';
import { ICheckIdentityDto } from './dto/CheckIdentityDto';
import CHECK_IDENTITY_SCHEMA from './schema/check.identity.schema.json';

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
    <MDContent>
      <MDCard title='AUTH:CHECK_IDENTITY.TITLE'>
        {state === false && (
          <MDForm
            initialValues={DEFAULT_VALUES}
            validationSchema={CHECK_IDENTITY_SCHEMA}
            onSubmit={handleCheckIdentity}
            backButton={false}>
            {(props: IMDFormPropsReturn) => <MDInputText label='AUTH:FIELDS.CODE' name='token' {...props} />}
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
    </MDContent>
  );
};

export default CheckIdentityPage;
