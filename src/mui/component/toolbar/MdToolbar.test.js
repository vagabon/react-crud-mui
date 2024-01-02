import { render, screen } from '@testing-library/react';
import MdToolbar from './MdToolbar';

describe('MdToolbar', () => {
  test('Given MdToolbar when its mount then Toolbar is shown', () => {
    render(<MdToolbar>Content</MdToolbar>);
    expect(screen.getByTestId('Toolbar')).toBeDefined();
  });
});
