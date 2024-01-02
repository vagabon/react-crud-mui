import { render, screen } from '@testing-library/react';
import MdBox from './MdBox';

describe('MdBox', () => {
  test('Given MdBox when its mount then Box is shown', () => {
    render(<MdBox />);
    expect(screen.getByTestId('Box')).toBeDefined();
  });
});
