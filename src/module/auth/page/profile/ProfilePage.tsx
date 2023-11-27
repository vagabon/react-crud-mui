import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../service/AuthService';
import { useAppDispatch, useAppSelector } from 'store/store';
import { IProfileDto } from '../../../user/dto/ProfileDto';
import { Trans } from 'react-i18next';
import { Primitif } from 'dto/api/ApiDto';
import MDCard from 'mui/card/MDCard';
import MdButton from 'mui/button/MdButton';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to='/auth/signin' />;
  }

  const handleLogout = () => {
    AuthService.logout()(dispatch);
    return <Navigate to='/home' />;
  };

  const showField = (key: string, value: Primitif) => {
    return (
      <p>
        <b>
          <Trans i18nKey={key} /> :{' '}
        </b>{' '}
        {value}
      </p>
    );
  };

  return (
    <MDCard title='AUTH:PROFILE.TITLE'>
      {showField('AUTH:FIELDS.LOGIN', currentUser.user?.username)}
      {showField(
        'AUTH:FIELDS.TOKEN',
        currentUser.jwt && currentUser.jwt.substring(0, 20) + '...' + currentUser.jwt.substr(currentUser.jwt.length - 20),
      )}
      {showField('AUTH:FIELDS.ID', currentUser.user?.id)}
      {showField('AUTH:FIELDS.EMAIL', currentUser.user?.email)}
      <b>
        <Trans i18nKey={'AUTH:FIELDS.ROLES'} />:
      </b>
      <ul>
        {currentUser.user &&
          currentUser.user.profiles &&
          currentUser.user.profiles.map((role: IProfileDto) => <li key={role.id}>{role.name}</li>)}
      </ul>
      <MdButton label='COMMON:LOGOUT' onClick={handleLogout} />
    </MDCard>
  );
};

export default ProfilePage;
