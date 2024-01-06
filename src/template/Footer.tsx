import MdBox from '../mui/component/box/MdBox';
import MdContainer from '../mui/component/container/MdContainer';
import MdLink from '../mui/component/link/MdLink';
import MdTypo from '../mui/component/typo/MdTypo';
import { IConfDto } from './AppTheme';

export interface IFoorterProps {
  conf: IConfDto;
}

const Footer: React.FC<IFoorterProps> = ({ conf }) => {
  return (
    <MdBox component='footer' sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <MdContainer maxWidth='lg'>
        <MdTypo variant='body2' color='secondary' align='center'>
          {'Copyright © '}
          <MdLink label={conf.FOOTER.WEBSITE} href={conf.FOOTER.URL} target={conf.FOOTER.TARGET} color='inherit' />{' '}
          {new Date().getFullYear()}
          {'.'}
        </MdTypo>
      </MdContainer>
    </MdBox>
  );
};

export default Footer;
