import { fireEvent, render, screen } from '@testing-library/react';
import MdSearchBar from './MdSearchBar';

jest.useFakeTimers();

test('renders learn react link', () => {
  const mockCallback = jest.fn();
  render(<MdSearchBar search='plouf' callBack={mockCallback} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: { test: 'test' } } });
  setTimeout(() => {
    expect(mockCallback).toBeCalled();
  }, 600);
});
