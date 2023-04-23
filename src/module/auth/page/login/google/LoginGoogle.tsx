import { useGoogleLogin } from '@react-oauth/google';
import AuthService from 'module/auth/service/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginAction } from 'module/auth/reducer/AuthReducers';
import { StorageUtils } from 'utils/storage/StorageUtils';
import MdButton from 'mui/button/MdButton';

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
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <>
      <div className='flex align-center margin-5'>
        <MdButton
          label='AUTH:LOGIN.GOOGLE'
          variant='outlined'
          color='google'
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}></MdButton>
      </div>
    </>
  );
};

export default LoginGoogle;
