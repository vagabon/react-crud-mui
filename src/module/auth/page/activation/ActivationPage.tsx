import MdButton from 'mui/button/MdButton';
import MDCard from 'mui/card/MDCard';
import MDContent from 'mui/content/MDContent';
import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/store';
import AuthService from '../../service/AuthService';

const ActivationPage: React.FC = () => {
  const params = useParams();
  const [isActivated, setIsActivated] = useState<boolean | undefined>(undefined);

  const { message } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (params.token) {
      AuthService.activation(params.token).then(() => {
        setIsActivated(true);
      });
    }
  }, [params.token]);

  useEffect(() => {
    if (message !== '') {
      setIsActivated(false);
    } else {
      setIsActivated(undefined);
    }
  }, [message]);

  return (
    <MDContent>
      <MDCard title='AUTH:ACTIVATION.TITLE'>
        {isActivated === undefined && <Trans i18nKey='AUTH:ACTIVATION.CURRENT' />}
        {isActivated === false && <Trans i18nKey='AUTH:ACTIVATION.FAIL' />}
        {isActivated === true && (
          <>
            <Trans i18nKey='AUTH:ACTIVATION.ACTIVATED' />
            <div className='flex margin-top-20'>
              <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={true} />
            </div>
          </>
        )}
      </MDCard>
    </MDContent>
  );
};

export default ActivationPage;
