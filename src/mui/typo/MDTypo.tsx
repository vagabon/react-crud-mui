import { SxProps, Theme, Typography, TypographyOwnProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';
import { Trans } from 'react-i18next';

export interface IMDTypoProps {
  label?: string;
  paragraph?: boolean;
  variant?: Variant | 'inherit';
  color?: TypographyOwnProps['color'];
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  noWrap?: boolean;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

const MDTypo: React.FC<IMDTypoProps> = ({ label, paragraph, variant, color, align, noWrap, sx, children }) => {
  return (
    <Typography paragraph={paragraph} variant={variant} color={color} align={align} noWrap={noWrap} sx={sx}>
      {label && <Trans i18next={label} />}
      {children}
    </Typography>
  );
};

export default MDTypo;
