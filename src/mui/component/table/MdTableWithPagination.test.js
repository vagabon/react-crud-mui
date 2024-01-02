import { render, screen } from '@testing-library/react';
import MdTableWithPagination from './MdTableWithPagination';

describe('MdTableWithPagination', () => {
  test('Given MdTableWithPagination when its mount then Table is shown', () => {
    const callBack = jest.fn();
    render(
      <MdTableWithPagination
        url='url'
        cells={[{ name: 'name', label: 'label', order: true }]}
        datas={[{ id: 1 }]}
        count={10}
        page={0}
        rowsPerPage={5}
        sortBy='name'
        sortByOrder='asc'
        callBack={callBack}>
        Content
      </MdTableWithPagination>,
    );
    expect(screen.getByTestId('Table')).toBeDefined();
  });
});
