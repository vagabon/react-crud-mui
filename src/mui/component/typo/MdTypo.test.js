import { render, screen } from '@testing-library/react';
import MdTypo from './MdTypo';

describe('MdTypo', () => {
  test('Given MdTypo when its mount then ButtonGroup is shown', () => {
    render(<MdTypo>Content</MdTypo>);
    expect(screen.getByTestId('Typography')).toBeDefined();
  });
});
