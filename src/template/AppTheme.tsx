import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JSONObject } from '../dto/api/ApiDto';
import { IMenuDto } from '../dto/menu/MenuDto';
import ShowMessage from '../mui/component/snackbar/ShowMessage';
import MdThemeProvider from '../mui/component/theme/MdThemeProvider';
import { useTheme } from '../mui/component/theme/useTheme';
import { CommonAction } from '../reducer/common/CommonReducer';
import { useAppDispatch } from '../store/Store';
import Footer from './Footer';
import Header from './Header';

export interface IConfDto {
  TITLE: string;
  LOGO: string;
  FOOTER: {
    WEBSITE: string;
    URL: string;
    TARGET: string;
  };
}

export interface IAppThemeProps {
  palette: JSONObject;
  conf: IConfDto;
  menu: IMenuDto[];
  children: ReactNode;
}

const AppTheme: React.FC<IAppThemeProps> = ({ palette, conf, menu, children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { mode, theme, switchTheme } = useTheme(palette);

  useEffect(() => {
    dispatch(CommonAction.clearMessage());
    dispatch(CommonAction.addHistory({ id: '', title: '', link: location.pathname }));
  }, [location, dispatch]);

  return (
    <MdThemeProvider theme={theme}>
      <div className='flex heigth100'>
        <Header mode={mode} conf={conf} menu={menu} callbackTheme={switchTheme(mode)} />

        <div className={'flex main-container mode-' + mode}>{children}</div>

        <ShowMessage />

        <Footer conf={conf} />
      </div>
    </MdThemeProvider>
  );
};

export default AppTheme;
