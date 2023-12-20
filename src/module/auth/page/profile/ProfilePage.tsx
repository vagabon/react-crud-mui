import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { Primitif } from '../../../../dto/api/ApiDto';
import MdButton from '../../../../mui/component/button/MdButton';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import { useAppDispatch, useAppSelector } from '../../../../store/Store';
import { IProfileDto } from '../../../user/dto/ProfileDto';
import AuthService from '../../service/AuthService';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const handleLogout = useCallback(() => {
    AuthService.logout()(dispatch);
    navigate('/home');
  }, [navigate, dispatch]);

  const showField = useCallback((key: string, value: Primitif) => {
    return (
      <p>
        <b>
          <Trans i18nKey={key} /> :{' '}
        </b>{' '}
        {value}
      </p>
    );
  }, []);

  if (!currentUser) {
    return <Navigate to='/auth/signin' />;
  }

  return (
    <MdContent>
      <MdCard title='AUTH:PROFILE.TITLE'>
        {showField('AUTH:FIELDS.LOGIN', currentUser.user?.username)}
        {showField(
          'AUTH:FIELDS.TOKEN',
          currentUser.jwt &&
            currentUser.jwt.substring(0, 20) + '...' + currentUser.jwt.substr(currentUser.jwt.length - 20),
        )}
        {showField('AUTH:FIELDS.ID', currentUser.user?.id)}
        {showField('AUTH:FIELDS.EMAIL', currentUser.user?.email)}
        <b>
          <Trans i18nKey={'AUTH:FIELDS.ROLES'} />:
        </b>
        <ul>
          {currentUser.user?.profiles?.map((role: IProfileDto) => (
            <li key={role.id}>{role.name}</li>
          ))}
        </ul>
        <MdButton label='COMMON:LOGOUT' onClick={handleLogout} />
      </MdCard>
    </MdContent>
  );
};

export default ProfilePage;
