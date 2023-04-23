import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useParams } from 'react-router';
import { useAppSelector } from 'store/store';
import AuthService from '../../service/AuthService';
import MDCard from 'mui/card/MDCard';
import MdButton from 'mui/button/MdButton';

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
  );
};

export default ActivationPage;
