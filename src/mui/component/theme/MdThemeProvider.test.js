import { render, screen } from '@testing-library/react';
import MdThemeProvider from './MdThemeProvider';

describe('MdThemeProvider', () => {
  test('Given MdThemeProvider when its mount then ThemeProvider is shown', () => {
    render(<MdThemeProvider>Content</MdThemeProvider>);
    expect(screen.getByTestId('ThemeProvider')).toBeInTheDocument();
  });
});
