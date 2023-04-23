import MDLink from 'mui/link/MDLink';
import { AuthFooterEnum } from './enum/AuthFooterEnum';
import MDGrid from 'mui/grid/MDGrid';

interface IAuthFooter {
  left: AuthFooterEnum;
  rigth: AuthFooterEnum;
}

const AuthFooter: React.FC<IAuthFooter> = (props: IAuthFooter) => {
  const getLink = (type: AuthFooterEnum) => {
    switch (type) {
      case AuthFooterEnum.SIGNIN:
        return <MDLink label='AUTH:LOGIN.GET_ACCOUNT' href='/auth/signin' variant='body2' />;
      case AuthFooterEnum.SIGNUP:
        return <MDLink label='AUTH:LOGIN.NO_ACCOUNT' href='/auth/signup' variant='body2' />;
      case AuthFooterEnum.FORGETED_PASSWORD:
        return <MDLink label='AUTH:LOGIN.FORGET_PASSWORD' href='/auth/forget/password' variant='body2' />;
    }
  };

  return (
    <MDGrid container style={{ marginTop: '15px' }}>
      <MDGrid item xs>
        {getLink(props.left)}
      </MDGrid>
      <MDGrid item>{getLink(props.rigth)}</MDGrid>
    </MDGrid>
  );
};

export default AuthFooter;
