import { render, screen } from '@testing-library/react';
import MdFabAdd from './MdFabAdd';

describe('MdFabAdd', () => {
  test('Given MdFabAdd when its mount then ButtonGroup is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1, profiles: [{ name: 'ADMIN', roles: 'ADMIN' }] } } },
      }),
    );
    render(<MdFabAdd urlAdd='urlAdd' urlAddRole={['ADMIN']} />);
    expect(screen.getByTestId('Fab')).toBeInTheDocument();
  });
});
