import { ListUtils } from './ListUtils';

describe('ListUtils - convertEnumToList', () => {
  test('When ListUtils When convert enum to list Then return true', () => {
    const tested = ListUtils.convertEnumToList(
      {
        TEST: 'TEST',
        TEST_AGAIN: 'TEST_AGAIN',
      },
      'LIBELLE.',
      jest.fn(),
    );
    expect(tested.length).toBe(2);
    expect(tested[0].id).toBe('TEST');
    expect(tested[1].id).toBe('TEST_AGAIN');
  });
});

describe('ListUtils - getListeBoolean', () => {
  test('When ListUtils When getListeBoolean Then return dto for radio input', () => {
    const tested = ListUtils.getListeBoolean(jest.fn());
    expect(tested.length).toBe(2);
    expect(tested[0].id).toBe('true');
    expect(tested[1].id).toBe('false');
  });
});

describe('ListUtils - toSelectData', () => {
  test('When ListUtils When toSelectData Then return a ListType', () => {
    const tested = ListUtils.toSelectData([{ name: 'name', id: 1 }]);
    expect(tested.length).toBe(1);
    expect(tested[0].id).toBe(1);
    expect(tested[0].name).toBe('name');
  });
});
