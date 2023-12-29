import { fireEvent, render, screen } from '@testing-library/react';
import MdFab from './MdFab';

describe('MdFab', () => {
  test('Given MdFab when its mount then ButtonGroup is shown', () => {
    render(<MdFab>Content</MdFab>);
    expect(screen.getByTestId('Fab')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('Fab'));
  });
});
