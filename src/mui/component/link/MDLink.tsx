import { TypographyOwnProps } from '@mui/material';
import Link from '@mui/material/Link';
import { Trans } from 'react-i18next';

export interface IMDLinkProps {
  href: string;
  variant?: TypographyOwnProps['variant'];
  label?: string;
  color?: string;
  target?: string;
  show?: boolean;
}

const MDLink: React.FC<IMDLinkProps> = ({ href, variant, label, color, target, ...rest }) => {
  return (
    <>
      {rest.show && (
        <Link href={href} variant={variant ?? 'body2'} color={color} target={target}>
          <Trans i18nKey={label} />
        </Link>
      )}
    </>
  );
};

MDLink.defaultProps = {
  show: true,
};

export default MDLink;
