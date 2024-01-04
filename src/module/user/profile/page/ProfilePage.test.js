import { render, screen, waitFor } from '@testing-library/react';
import UserService from '../../user/service/UserService';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  test('Given ProfilePage when its mount then CardContent is shown', async () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: {
          user: { user: { id: '1', username: 'username', email: 'email', profiles: [{ id: 1, name: 'ADMIN' }] } },
        },
        common: { history: [] },
      }),
    );

    const profileReact = (id) => {
      return <>{id}</>;
    };

    jest
      .spyOn(UserService, 'fetchById')
      .mockReturnValue(Promise.resolve({ id: 1, profiles: [{ id: 1, name: 'ADMIN' }] }));
    render(<ProfilePage profileReact={profileReact} />);
    await waitFor(() => {
      expect(screen.getAllByTestId('CardContent')).toBeDefined();
    });
  });

  test('Given ProfilePage when its mount then CardContent is shown', async () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({ auth: { user: null }, common: { message: '', history: [] } }),
    );

    jest
      .spyOn(UserService, 'fetchById')
      .mockReturnValue(Promise.resolve({ id: 1, profiles: [{ id: 1, name: 'ADMIN' }] }));
    render(<ProfilePage profileReact={() => <></>} />);
    await waitFor(() => {
      expect(screen.getAllByTestId('CardContent')).toBeDefined();
    });
  });
});
