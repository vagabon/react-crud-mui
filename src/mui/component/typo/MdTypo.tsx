import { SxProps, Theme, Typography, TypographyOwnProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface IMdTypoProps {
  label?: string;
  paragraph?: boolean;
  variant?: Variant | 'inherit';
  color?: TypographyOwnProps['color'];
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  noWrap?: boolean;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

const MdTypo: React.FC<IMdTypoProps> = ({ label, paragraph, variant, color, align, noWrap, sx, children }) => {
  const { t } = useTranslation();

  return (
    <Typography paragraph={paragraph} variant={variant} color={color} align={align} noWrap={noWrap} sx={sx}>
      {t(label ?? '')}
      {children}
    </Typography>
  );
};

export default MdTypo;
