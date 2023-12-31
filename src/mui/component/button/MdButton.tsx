import Button from '@mui/material/Button';
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ColorType, useIcon } from '../../hook/useIcon';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    google: true;
    facebook: true;
  }
}

export interface IMdButtonProps {
  show?: boolean;
  label?: string;
  url?: string;
  startIcon?: string;
  icon?: string;
  iconColor?: ColorType;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'google' | 'facebook';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
}

const MdButton: React.FC<IMdButtonProps> = (props: IMdButtonProps) => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState<ReactNode | undefined>(undefined);
  const { getIcon } = useIcon();

  useEffect(() => {
    setIcon(getIcon(props.icon, props.iconColor));
  }, [props.icon, props.iconColor, getIcon]);

  const onClick = useCallback(
    (callback?: () => void) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (callback) {
        callback();
      } else if (props.url) {
        navigate(props.url);
      }
    },
    [props.url, navigate],
  );

  const showContent = useCallback(() => {
    return <>{icon ? <>{icon}</> : <Trans i18nKey={props.label}></Trans>}</>;
  }, [icon, props.label]);

  return (
    <>
      {props.show && (
        <Button
          size={props.size ?? 'small'}
          variant={props.variant}
          onClick={onClick(props.onClick)}
          startIcon={getIcon(props.startIcon)}
          color={props.color ?? 'primary'}>
          {showContent()}
        </Button>
      )}
    </>
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
