import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useAppSelector } from '../../../store/Store';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionRight = (props: TransitionProps) => {
  return <Slide {...props} direction='left' />;
};

const ShowMessage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined);
  const { message, type } = useAppSelector((state) => state.common);

  useEffect(() => {
    setTransition(() => TransitionRight);
    setOpen(message !== '');
  }, [message, type]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      TransitionComponent={transition}
      key={transition ? transition.name : ''}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        <Trans i18nKey={message} />
      </Alert>
    </Snackbar>
  );
};

export default ShowMessage;
