import { fireEvent, render, screen } from '@testing-library/react';
import CustomModale from './CustomModale';

describe('CustomModale', () => {
  test('Given CustomModale when its mount with no data then list is empty', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { message: '' } }));
    render(
      <CustomModale className='className' button='button'>
        {() => <></>}
      </CustomModale>,
    );
    expect(screen.getByTestId('Modal')).toBeDefined();
    fireEvent.click(screen.getByTestId('Modal'));
  });
});
