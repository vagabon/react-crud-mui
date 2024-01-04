import { useEffect } from 'react';
import { ID } from '../../../../dto/api/ApiDto';
import { useMdNavigate, useMdParams } from '../../../../hook/navigate/useMdNavigate';
import { useAppSelector } from '../../../../store/Store';
import { useUser } from '../../user/hook/useUser';
import ProfileShow from '../component/ProfileShow';

interface IProfilePageProps {
  profileReact: (id: ID) => React.JSX.Element;
}

const ProfilePage: React.FC<IProfilePageProps> = ({ profileReact }) => {
  const { navigate } = useMdNavigate();
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
    navigate('/auth/signin');
    return <></>;
  }

  return <ProfileShow user={id !== -1 ? user : currentUser.user} profileReact={profileReact} />;
};

export default ProfilePage;
