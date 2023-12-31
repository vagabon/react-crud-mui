import { useCallback } from 'react';
import { LoginAction } from '../../module/auth/reducer/AuthReducers';
import AuthService from '../../module/auth/service/AuthService';
import { useAppDispatch } from '../../store/Store';
import { useMdNavigate } from '../navigate/useMdNavigate';

export const useUserAuth = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useMdNavigate();

  const handleLogout = useCallback(() => {
    AuthService.logout();
    dispatch(LoginAction.setLoginError());
    navigate('/home');
  }, [navigate, dispatch]);

  return { handleLogout };
};
