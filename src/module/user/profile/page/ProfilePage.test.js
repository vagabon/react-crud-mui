import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  test('Given ProfilePage when its mount then CardContent is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, username: 'username', email: 'email', profiles: [{ id: 1, name: 'ADMIN' }] } } },
        common: { history: [] },
      }),
    );

    const profileReact = (id) => {
      return <>{id}</>;
    };

    render(<ProfilePage profileReact={profileReact} />);
    expect(screen.getAllByTestId('CardContent')).toBeDefined();
  });
});
