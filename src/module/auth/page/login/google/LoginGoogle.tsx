import { useGoogleLogin } from '@react-oauth/google';
import MdButton from '../../../../../mui/component/button/MdButton';
import { useAuth } from '../../../hook/useAuth';

const LoginGoogle: React.FC = () => {
  const { handleGoogleLogin: doGoogleLogin } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      doGoogleLogin(codeResponse.access_token);
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
