import { fireEvent, render, screen } from '@testing-library/react';
import MdFormAutocomplete from './MdFormAutocomplete';

describe('MdFormAutocomplete', () => {
  test('Given MdFormAutocomplete when its mount then Autocomplete is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: '' },
      }),
    );
    const handleChange = jest.fn();
    render(
      <MdFormAutocomplete
        label='label'
        name='name'
        list={['name']}
        values={{ name: 'name' }}
        errors={[]}
        handleChange={handleChange}
      />,
    );
    expect(screen.getByTestId('Autocomplete')).toBeDefined();
    fireEvent.click(screen.getByTestId('Autocomplete'));
  });
});
