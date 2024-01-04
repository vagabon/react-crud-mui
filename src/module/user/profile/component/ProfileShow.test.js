import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProfileShow from './ProfileShow';

describe('ProfileShow', () => {
  test('Given ProfileShow when its mount then CardContent is shown', async () => {
    const mockUser = { id: 1, profiles: [{ id: 1, name: 'ADMIN' }] };

    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: {
          user: { user: mockUser },
        },
        common: { history: [] },
      }),
    );

    const profileReact = (id) => {
      return <>{id}</>;
    };

    render(<ProfileShow user={mockUser} profileReact={profileReact} />);
    await waitFor(() => {
      expect(screen.getAllByTestId('CardContent')).toBeDefined();
      fireEvent.click(screen.getAllByTestId('Button')[0]);
      fireEvent.click(screen.getAllByTestId('Button')[1]);
      fireEvent.click(screen.getAllByTestId('Button')[2]);
      fireEvent.click(screen.getAllByTestId('Button')[3]);
      fireEvent.click(screen.getAllByTestId('Button')[4]);
      fireEvent.click(screen.getAllByTestId('Button')[5]);
      fireEvent.click(screen.getAllByTestId('Button')[6]);
      fireEvent.click(screen.getAllByTestId('Button')[7]);
    });
  });
});
