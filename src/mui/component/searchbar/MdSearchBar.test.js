import { fireEvent, render, screen } from '@testing-library/react';
import MdSearchBar from './MdSearchBar';

jest.useFakeTimers();

jest.mock('../form/MdInputTextSimple', () => ({ handleChange }) => {
  return <input data-testid='MdInputTextSimple' onChange={handleChange} />;
});

test('renders learn react link', () => {
  const mockCallback = jest.fn();
  render(<MdSearchBar search='plouf' callBack={mockCallback} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('MdInputTextSimple'), { target: { value: { test: 'test' } } });
});
