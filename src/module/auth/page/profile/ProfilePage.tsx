import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Primitif } from '../../../../dto/api/ApiDto';
import { useUserAuth } from '../../../../hook/user/useUserAuth';
import MdAvatar from '../../../../mui/component/avatar/MdAvatar';
import MdButton from '../../../../mui/component/button/MdButton';
import MdContent from '../../../../mui/component/content/MdContent';
import MdFormFile from '../../../../mui/component/form/MdFormFile';
import { useAppSelector } from '../../../../store/Store';
import { IProfileDto } from '../../../user/dto/ProfileDto';

const ProfilePage: React.FC = () => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { handleLogout } = useUserAuth();

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
      <Card>
        <CardContent>
          <div className='flex flex-row gap1'>
            <div className='flex align-center'>
              <CardMedia>
                <MdAvatar
                  name={currentUser.user.username}
                  image={currentUser.user.avatar}
                  sx={{ height: '200px', width: '200px', fontSize: '10rem' }}
                />
              </CardMedia>

              <MdFormFile label='' name='avatar' handleChangeFile={() => {}} />
            </div>
            <div className='flex1'>
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
            </div>
          </div>
        </CardContent>

        <CardActions className='justify-end'>
          <MdButton label='COMMON:LOGOUT' color='error' onClick={handleLogout} />
        </CardActions>
      </Card>
    </MdContent>
  );
};

export default ProfilePage;
