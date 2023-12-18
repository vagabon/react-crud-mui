import Link from '@mui/material/Link';
import { Trans } from 'react-i18next';

interface IMDLink {
  href: string;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit';
  label?: string;
  show?: boolean;
}

const MDLink: React.FC<IMDLink> = ({ href, variant, label, ...rest }: IMDLink) => {
  return (
    <>
      {rest.show && (
        <Link href={href} variant={variant ?? 'body2'}>
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
