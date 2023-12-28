import { render, screen } from '@testing-library/react';
import MdContainer from './MdContainer';

describe('MdContainer', () => {
  test('Given MdContainer when its mount then ButtonGroup is shown', () => {
    render(<MdContainer>Content</MdContainer>);
    expect(screen.getByTestId('Container')).toBeInTheDocument();
  });
});
