import { render, screen } from '@testing-library/react';
import MdAvatar from './MdAvatar';

describe('MdAvatar', () => {
  test('Given MdAvatar when its mount then Avatar is shown', () => {
    render(<MdAvatar name='name' />);
    expect(screen.getByTestId('Avatar')).toBeDefined();
  });
  test('Given MdAvatar when its mount then Avatar is shown', () => {
    render(<MdAvatar name='name' image='image' />);
    expect(screen.getByTestId('Avatar')).toBeDefined();
  });
});
