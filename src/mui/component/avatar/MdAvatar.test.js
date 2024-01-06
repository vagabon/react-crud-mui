import { fireEvent, render, screen } from '@testing-library/react';
import MdAvatar from './MdAvatar';

describe('MdAvatar', () => {
  test('Given MdAvatar when its mount then Avatar is shown', () => {
    render(<MdAvatar name='name' url='url' callback={() => {}} />);
    expect(screen.getByTestId('Avatar')).toBeDefined();
    fireEvent.click(screen.getByTestId('IconButton'));
  });
  test('Given MdAvatar when its mount then Avatar is shown', () => {
    render(<MdAvatar name='name' image='http://image' />);
    expect(screen.getByTestId('Avatar')).toBeDefined();
  });
  test('Given MdAvatar when its mount then Avatar is shown', () => {
    render(<MdAvatar name='name' image='/image' />);
    expect(screen.getByTestId('Avatar')).toBeDefined();
  });
});
