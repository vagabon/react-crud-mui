import FacebookLogin from '@greatsumini/react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAppDispatch } from 'store/store';
import { useNavigate } from 'react-router-dom';
import AuthService from 'module/auth/service/AuthService';
import { LoginAction } from 'module/auth/reducer/AuthReducers';
import { StorageUtils } from 'utils/storage/StorageUtils';
import MdButton from 'mui/button/MdButton';

const FACEBOOK_CLIENT_ID: string = window['ENV' as any]['FACEBOOK_CLIENT_ID' as any]?.toString();

const LoginFacebook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <FacebookLogin
        appId={FACEBOOK_CLIENT_ID}
        onSuccess={(response) => {
          AuthService.facebookConnect(response.accessToken).then((data) => {
            dispatch(LoginAction.setLoginSuccess(data));
            StorageUtils.setCurrentUser(data);
            navigate('/auth/profile');
          });
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        render={({ onClick }) => (
          <div className='flex align-center margin-5'>
            <MdButton
              label='AUTH:LOGIN.FACEBOOK'
              variant='outlined'
              startIcon={<FacebookIcon />}
              onClick={onClick}
              color='facebook'></MdButton>
          </div>
        )}
      />
    </>
  );
};

export default LoginFacebook;
