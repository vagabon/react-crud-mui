import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  test('Given ProfilePage when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, username: 'username', email: 'email', profiles: [{ id: 1, name: 'ADMIN' }] } } },
      }),
    );
    render(<ProfilePage />);
    expect(screen.getByText(/AUTH:PROFILE.TITLE/)).toBeDefined();
  });
});
