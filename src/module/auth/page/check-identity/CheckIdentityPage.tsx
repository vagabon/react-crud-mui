import { useCallback, useState } from 'react';
import { Trans } from 'react-i18next';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdInputText from '../../../../mui/component/form/MdInputText';
import AuthFooter from '../../component/auth.footer/AuthFooter';
import { AuthFooterEnum } from '../../component/auth.footer/enum/AuthFooterEnum';
import LoginService from '../../service/AuthService';
import { ICheckIdentityDto } from './dto/CheckIdentityDto';
import CHECK_IDENTITY_SCHEMA from './schema/check.identity.schema.json';

const DEFAULT_VALUES = { token: '' };

const CheckIdentityPage: React.FC = () => {
  const [state, setState] = useState<boolean>(false);

  const handleCheckIdentity = useCallback((data: ICheckIdentityDto) => {
    LoginService.checkIdentityToken(data.token as string).then((data: ICheckIdentityDto) => {
      if (data.token !== '') {
        LoginService.resetPassword(data.token as string).then((data: ICheckIdentityDto) => {
          if (data.token !== '') {
            setState(true);
          }
        });
      }
    });
  }, []);

  return (
    <MdContent>
      <MdCard title='AUTH:CHECK_IDENTITY.TITLE'>
        {state === false && (
          <MdForm
            initialValues={DEFAULT_VALUES}
            validationSchema={CHECK_IDENTITY_SCHEMA}
            onSubmit={handleCheckIdentity}
            backButton={false}>
            {(props: IMdFormPropsReturnDto) => <MdInputText label='AUTH:FIELDS.CODE' name='token' {...props} />}
          </MdForm>
        )}
        {state === true && (
          <div>
            <Trans i18nKey='AUTH:CHECK_IDENTITY.SUCCESS' />
            <p>&nbsp;</p>
          </div>
        )}

        <AuthFooter left={AuthFooterEnum.FORGETED_PASSWORD} rigth={AuthFooterEnum.SIGNIN} />
      </MdCard>
    </MdContent>
  );
};

export default CheckIdentityPage;
