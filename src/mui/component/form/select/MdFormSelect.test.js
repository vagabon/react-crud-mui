import { fireEvent, render, screen } from '@testing-library/react';
import MdFormSelect from './MdFormSelect';

describe('MdFormSelect', () => {
  test('Given MdFormSelect when its mount then select is shown', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { message: '' },
      }),
    );
    const callBack = jest.fn();
    render(
      <MdFormSelect
        label='label'
        name='name'
        list={[{ id: 1, libelle: 'name' }]}
        values={{ name: 'name' }}
        validationSchema={{ name: { required: true, listId: true } }}
        errors={[]}
        handleChange={callBack}
        callBack={callBack}
      />,
    );
    expect(screen.getByTestId('Select')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('Select'), { target: { value: 1 } });
  });
});
