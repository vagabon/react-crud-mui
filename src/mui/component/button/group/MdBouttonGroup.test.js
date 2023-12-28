import { render, screen } from '@testing-library/react';
import MdBouttonGroup from './MdBouttonGroup';

describe('MdBouttonGroup', () => {
  test('Given MdBouttonGroup when its mount then ButtonGroup is shown', () => {
    render(<MdBouttonGroup />);
    expect(screen.getByTestId('ButtonGroup')).toBeInTheDocument();
  });
});
