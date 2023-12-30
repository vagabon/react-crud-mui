import { fireEvent, render, screen } from '@testing-library/react';
import CustomIcon from './CustomIcon';

describe('CustomIcon', () => {
  test('Given CustomIcon when its mount then ', () => {
    const callback = jest.fn();
    render(<CustomIcon icon='delete' color='primary' disabled={false} callback={callback} />);
    fireEvent.click(screen.getByTestId('IconButton'));
    expect(callback).toBeCalled();
  });
});
