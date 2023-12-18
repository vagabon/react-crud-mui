import FacebookLogin from '@greatsumini/react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../../../reducer/AuthReducers';
import AuthService from '../../../service/AuthService';
import MdButton from '../../../../../mui/button/MdButton';
import { useAppDispatch } from '../../../../../store/Store';
import { StorageUtils } from '../../../../../utils/storage/StorageUtils';

const FACEBOOK_CLIENT_ID: string = window['ENV' as keyof Window]['FACEBOOK_CLIENT_ID' as keyof Window]?.toString();

const LoginFacebook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
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
  );
};

export default LoginFacebook;
