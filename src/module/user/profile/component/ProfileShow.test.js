import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProfileShow from './ProfileShow';

describe('ProfileShow', () => {
  test('Given ProfileShow when its mount then CardContent is shown', async () => {
    const mockUser = { id: 1, profiles: [{ id: 1, name: 'ADMIN' }] };

    useAppSelectorSpy.mockImplementation((callback) =>
      callback({ auth: { user: { user: mockUser } }, common: { history: [] } }),
    );

    const profileReact = (id) => {
      return <>{id}</>;
    };

    render(<ProfileShow user={mockUser} profileReact={profileReact} />);
    await waitFor(() => {
      expect(screen.getAllByTestId('CardContent')).toBeDefined();
      for (let i = 0; i < screen.getAllByTestId('Button').length; i++) {
        fireEvent.click(screen.getAllByTestId('Button')[i]);
      }
    });
  });
});
