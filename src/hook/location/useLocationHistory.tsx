import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { JSON } from '../../dto/api/ApiDto';
import { IMenuDto } from '../../dto/menu/MenuDto';
import { useMessage } from '../../hook/message/useMessage';
import { CommonAction } from '../../reducer/common/CommonReducers';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { UuidUtils } from '../../utils/uuid/UuidUtils';

export const useLocationHistory = (menus: IMenuDto[]) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { clearMessage } = useMessage();
  const { scrolls } = useAppSelector((state) => state.common);
  const [pathname, setPathname] = useState<string>('/');
  const stopScroll = useRef(false);

  useEffect(() => {
    stopScroll.current = false;
    const newPathname = location.pathname === '/' ? '/home' : location.pathname;
    newPathname !== '/home' && clearMessage();
    const pathnameWithoutParam = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
    let title = newPathname;
    menus.forEach((menu: IMenuDto) => {
      if (menu.link === newPathname || menu.link === pathnameWithoutParam) {
        title = menu.title;
      }
      menu.childrens?.forEach((chidren: IMenuDto) => {
        if (chidren.link === newPathname || chidren.link === pathnameWithoutParam) {
          title = chidren.title;
        }
      });
    });
    setPathname(title);
    dispatch(CommonAction.addHistory({ id: UuidUtils.createUUID(), title: title, link: newPathname }));
  }, [location, dispatch, menus, clearMessage]);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    if (stopScroll.current === true) {
      dispatch(CommonAction.setScrools({ pathname, position }));
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // NO LINTER HERE : the scroll muse happear when a new page is load after a navidate
    const oldScroll = scrolls[pathname as keyof JSON] ? scrolls[pathname as keyof JSON] : 0;
    setTimeout(() => {
      window.scrollTo(0, oldScroll as number);
    }, 100);
    setTimeout(() => {
      window.scrollTo(0, oldScroll as number);
      stopScroll.current = true;
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
};
