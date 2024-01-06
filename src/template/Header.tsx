import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMdNavigate } from '../hook/navigate/useMdNavigate';
import { useUserAuth } from '../hook/user/useUserAuth';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../store/Store';

import CustomModaleConfirm from '../module/custom/modale/component/CustomModaleConfirm';

import { IApiDto } from '../dto/api/ApiDto';
import { IMenuDto } from '../dto/menu/MenuDto';
import CustomIcon from '../module/custom/icon/component/CustomIcon';
import MdAvatar from '../mui/component/avatar/MdAvatar';
import MdBox from '../mui/component/box/MdBox';
import MdButton from '../mui/component/button/MdButton';
import MdBouttonGroup from '../mui/component/button/group/MdBouttonGroup';
import MdLinearProgress from '../mui/component/linear-progress/MdLinearProgress';
import MdMenuItem from '../mui/component/menu/MdMenuItem';
import HasRole from '../mui/component/role/HasRole';
import { ModeType } from '../mui/component/theme/useTheme';
import MdToolbar from '../mui/component/toolbar/MdToolbar';
import MdTypo from '../mui/component/typo/MdTypo';

export interface IHeaderProps {
  mode: ModeType;
  conf: { TITLE: string; LOGO: string };
  menu: IMenuDto[];
  callbackTheme?: () => void;
}

const Header: React.FC<IHeaderProps> = ({ mode, conf, menu, callbackTheme }) => {
  const { navigate } = useMdNavigate();
  const dispatch = useAppDispatch();
  const { loading, history } = useAppSelector((state) => state.common);
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { handleLogout } = useUserAuth();

  const goBack = useCallback((): void => {
    const lastPage = history[history.length - 2];
    dispatch(CommonAction.sliceHistory());
    navigate(lastPage.link);
  }, [dispatch, navigate, history]);

  return (
    <>
      <MdBox component='header' sx={{ bgcolor: 'background.paper' }}>
        <MdToolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className='back-button' style={{ width: '30px' }}>
            {history.length > 1 && <MdButton variant='text' icon='back' onClick={goBack} />}
          </div>
          <MdTypo align='left' noWrap={true} sx={{ flex: 1 }}>
            <Link to='/' style={{ display: 'flex' }}>
              <img src={conf.LOGO} width={40} alt={'Logo de ' + conf.TITLE} />
            </Link>
          </MdTypo>
          <CustomIcon icon={mode === 'dark' ? 'sun' : 'moon'} callback={callbackTheme} />
          <MdButton url='/auth/signup' label='AUTH:SIGNUP' variant='text' show={!isLoggedIn} />
          <MdButton url='/auth/signin' label='AUTH:SIGNIN' show={!isLoggedIn} />
          {user?.user && (
            <MdAvatar
              url='/profile'
              name={user.user?.username as string}
              image={user.user['avatar' as keyof IApiDto] as string}
            />
          )}
          {user?.user && <CustomModaleConfirm icon='exit' iconColor='error' callback={handleLogout} />}
        </MdToolbar>
        <MdToolbar
          id='menu'
          sx={{
            bgcolor: 'background.paper',
            justifyContent: 'center',
            borderBottom: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.12)',
          }}>
          <MdBouttonGroup variant='text' size='large'>
            {menu?.map((menu) => (
              <HasRole roles={menu.roles} key={menu.title} showError={false}>
                <MdMenuItem name={menu.title} url={menu.link} childrens={menu.childrens} />
              </HasRole>
            ))}
          </MdBouttonGroup>
        </MdToolbar>
      </MdBox>
      {loading ? <MdLinearProgress /> : <div style={{ minHeight: '4px' }}></div>}
    </>
  );
};
export default Header;
