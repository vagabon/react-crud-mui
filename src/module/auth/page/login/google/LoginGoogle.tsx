import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import MdButton from '../../../../../mui/component/button/MdButton';
import { useAppDispatch } from '../../../../../store/Store';
import { StorageUtils } from '../../../../../utils/storage/StorageUtils';
import { LoginAction } from '../../../reducer/AuthReducers';
import AuthService from '../../../service/AuthService';

const LoginGoogle: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      AuthService.googleConnect(codeResponse.access_token).then((data) => {
        dispatch(LoginAction.setLoginSuccess(data));
        StorageUtils.setCurrentUser(data);
        navigate('/auth/profile');
      });
    },
    onError: (error) => console.log('Google Login Failed:', error),
  });

  return (
    <div className='flex align-center margin-5'>
      <MdButton
        label='AUTH:LOGIN.GOOGLE'
        variant='outlined'
        color='google'
        startIcon='google'
        onClick={handleGoogleLogin}></MdButton>
    </div>
  );
};

export default LoginGoogle;
