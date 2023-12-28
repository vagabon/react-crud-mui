import { render, screen } from '@testing-library/react';
import MdLinearProgress from './MdLinearProgress';

describe('MdLinearProgress', () => {
  test('Given MdLinearProgress When its mount Then LinearProgress is shown', () => {
    render(<MdLinearProgress></MdLinearProgress>);
    expect(screen.getByTestId('LinearProgress')).toBeInTheDocument();
  });
});
