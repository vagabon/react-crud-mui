import { fireEvent, render, screen } from '@testing-library/react';
import CustomList from './CustomList';

describe('CustomList', () => {
  test('Given CustomList when its mount then ', () => {
    render(<CustomList datas={[]} />);
    expect(screen.getByTestId('List')).toBeInTheDocument();
  });

  test('Given CustomList when its mount then ', () => {
    const callback = jest.fn();
    const callbackCheckbox = jest.fn();
    const callbackDelete = jest.fn();
    render(
      <CustomList
        datas={[{ id: 1, avatar: 'avatar', name: 'name', icon: 'icon', checked: true }]}
        callback={callback}
        callbackCheckbox={callbackCheckbox}
        callbackDelete={callbackDelete}
      />,
    );
    expect(screen.getByTestId('List')).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('ListItem')[1]);
    expect(callback).toBeCalled();
    fireEvent.click(screen.getAllByTestId('Checkbox')[0]);
    expect(callbackCheckbox).toBeCalled();
  });
});
