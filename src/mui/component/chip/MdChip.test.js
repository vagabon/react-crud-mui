import { render, screen } from '@testing-library/react';
import MdChip from './MdChip';

describe('MdChip', () => {
  test('Given MdChip when its mount then ButtonGroup is shown', () => {
    const callbackDelete = jest.fn();
    render(<MdChip label='label' callbackDelete={callbackDelete}></MdChip>);
    expect(screen.getByTestId('Chip')).toBeDefined();
  });
});
