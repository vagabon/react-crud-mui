import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ID } from '../../../../dto/api/ApiDto';
import { useMdParams } from '../../../../hook/navigate/useMdNavigate';
import { useAppSelector } from '../../../../store/Store';
import { useUser } from '../../user/hook/useUser';
import ProfileShow from '../component/ProfileShow';

interface IProfilePageProps {
  profileReact: (id: ID) => React.JSX.Element;
}

const ProfilePage: React.FC<IProfilePageProps> = ({ profileReact }) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const {
    params: { id = -1 },
  } = useMdParams();
  const { user, fetchById } = useUser();

  useEffect(() => {
    if (id !== -1) {
      fetchById(id);
    }
  }, [fetchById, id, currentUser]);

  if (!currentUser) {
    return <Navigate to='/auth/signin' />;
  }

  return <ProfileShow user={id !== -1 ? user : currentUser.user} profileReact={profileReact} />;
};

export default ProfilePage;
