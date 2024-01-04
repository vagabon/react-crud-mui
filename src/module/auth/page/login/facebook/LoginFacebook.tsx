import FacebookLogin from '@greatsumini/react-facebook-login';
import MdButton from '../../../../../mui/component/button/MdButton';
import { WindowUtils } from '../../../../../utils/window/WindowUtils';
import { useAuth } from '../../../hook/useAuth';

const FACEBOOK_CLIENT_ID: string = WindowUtils.getEnv('FACEBOOK_CLIENT_ID');

const LoginFacebook: React.FC = () => {
  const { handleFacebookLogin } = useAuth();

  return (
    <FacebookLogin
      appId={FACEBOOK_CLIENT_ID}
      onSuccess={(response) => {
        handleFacebookLogin(response.accessToken);
      }}
      onFail={(error) => {
        console.log('Facebook Login Failed !', error);
      }}
      render={({ onClick }) => (
        <div className='flex align-center margin-5'>
          <MdButton
            label='AUTH:LOGIN.FACEBOOK'
            variant='outlined'
            startIcon='facebook'
            onClick={onClick}
            color='facebook'></MdButton>
        </div>
      )}
    />
  );
};

export default LoginFacebook;
