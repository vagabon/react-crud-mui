import { fireEvent, render, screen } from '@testing-library/react';
import MdMenuItem from './MdMenuItem';

jest.useFakeTimers();

jest.mock('../form/MdInputTextSimple', () => ({ handleChange }) => {
  return <input data-testid='MdInputTextSimple' onChange={handleChange} />;
});

test('renders learn react link', () => {
  render(
    <MdMenuItem name='name' url='url' childrens={[{ title: 'title', link: 'link' }]}>
      {' '}
    </MdMenuItem>,
  );
  expect(screen.getAllByRole('button')[0]).toBeDefined();
  fireEvent.click(screen.getByTestId('Menu'));
  fireEvent.click(screen.getByTestId('MenuItem'));
});
