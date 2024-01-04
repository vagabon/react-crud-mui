import { fireEvent, render, screen } from '@testing-library/react';
import CustomModaleConfirm from './CustomModaleConfirm';

describe('CustomModaleConfirm', () => {
  test('Given CustomModaleConfirm when its mount with no data then list is empty', () => {
    const mockCallback = jest.fn();
    render(
      <CustomModaleConfirm id='1' label='label' icon='icon' button='button' callback={mockCallback}>
        {() => <></>}
      </CustomModaleConfirm>,
    );
    expect(screen.getByTestId('Modal')).toBeDefined();
    fireEvent.click(screen.getByTestId('Modal'));
    fireEvent.click(screen.getAllByTestId('Button')[0]);
    fireEvent.click(screen.getAllByTestId('Button')[1]);
    fireEvent.click(screen.getByTestId('IconButton'));
  });
});
