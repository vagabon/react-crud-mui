import { fireEvent, render, screen } from '@testing-library/react';
import MdFormCheckbox from './MdFormCheckbox';

describe('MdFormCheckbox', () => {
  test('Given MdFormCheckbox when its mount then Checkbox is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: '' },
      }),
    );
    const handleChange = jest.fn();
    render(
      <MdFormCheckbox label='label' name='name' values={{ name: 'name' }} errors={[]} handleChange={handleChange} />,
    );
    expect(screen.getByTestId('Checkbox')).toBeDefined();
    fireEvent.click(screen.getByTestId('Checkbox'));
  });
});
