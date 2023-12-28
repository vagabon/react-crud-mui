import { render, screen } from '@testing-library/react';
import MdMarkdown from './MdMarkdown';

jest.useFakeTimers();

jest.mock('../form/MdInputTextSimple', () => ({ handleChange }) => {
  return <input data-testid='MdInputTextSimple' onChange={handleChange} />;
});

describe('MdMarkdown', () => {
  test('Given MdMarkdown When its mount Then MuiMarkdown is shown', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');

    const summaryCallback = jest.fn();
    render(
      <MdMarkdown content='content' summaryCallback={summaryCallback}>
        {' '}
      </MdMarkdown>,
    );
    jest.runAllTimers();
    expect(screen.getByTestId('MuiMarkdown')).toBeInTheDocument();
  });
});
