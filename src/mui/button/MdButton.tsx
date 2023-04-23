import Button from '@mui/material/Button';
import { Fragment } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    google: true;
    facebook: true;
  }
}

export interface MdButtonProps {
  show?: boolean;
  label: string;
  url?: string;
  startIcon?: any;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'google' | 'facebook';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
}

const MdButton: React.FC<MdButtonProps> = (props: MdButtonProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    } else if (props.url) {
      navigate(props.url);
    }
  };

  return (
    <Fragment>
      {props.show && (
        <Button
          size={props.size ?? 'small'}
          variant={props.variant}
          onClick={onClick}
          startIcon={props.startIcon}
          color={props.color ?? 'primary'}>
          <Trans i18nKey={props.label}></Trans>
        </Button>
      )}
    </Fragment>
  );
};

MdButton.defaultProps = {
  show: true,
  url: '#',
  size: 'small',
  label: '',
  variant: 'contained',
};

export default MdButton;
