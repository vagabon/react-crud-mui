import { ArrowBackIos } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  startIcon?: JSX.Element;
  icon?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'google' | 'facebook';
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
}

const MdButton: React.FC<IMdButtonProps> = (props: IMdButtonProps) => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState<ReactNode | undefined>(undefined);

  useEffect(() => {
    let newIcon = undefined;
    switch (props.icon) {
      case 'add':
        newIcon = <AddIcon />;
        break;
      case 'back':
        newIcon = <ArrowBackIos />;
        break;
      case 'add3':
        newIcon = <AddIcon />;
        break;
      case 'add4':
        newIcon = <AddIcon />;
        break;
      default:
        break;
    }
    setIcon(newIcon);
  }, [props.icon]);

  const onClick = useCallback(
    (callback?: () => void) => () => {
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
          startIcon={props.startIcon}
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
