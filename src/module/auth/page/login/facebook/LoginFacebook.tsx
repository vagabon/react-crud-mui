import FacebookLogin from '@greatsumini/react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import MdButton from '../../../../../mui/component/button/MdButton';
import { useAppDispatch } from '../../../../../store/Store';
import { StorageUtils } from '../../../../../utils/storage/StorageUtils';
import { WindowUtils } from '../../../../../utils/window/WindowUtils';
import { LoginAction } from '../../../reducer/AuthReducers';
import AuthService from '../../../service/AuthService';

const FACEBOOK_CLIENT_ID: string = WindowUtils.getEnv('FACEBOOK_CLIENT_ID');

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
        console.log('Facebook Login Failed !', error);
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
