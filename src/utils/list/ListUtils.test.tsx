import { ListUtils } from './ListUtils';

enum EnumTest {
  TEST,
  TEST_AGAIN,
}

describe('LIST UTILS - convertEnumToList', () => {
  test('When ListUtils When convert enum to list Then return true', () => {
    const tested = ListUtils.convertEnumToList(EnumTest, 'LIBELLE.', jest.fn());
    expect(tested.length).toBe(2);
    expect(tested[0].id).toBe('TEST');
    expect(tested[1].id).toBe('TEST_AGAIN');
  });
});

describe('LIST UTILS - getListeBoolean', () => {
  test('When ListUtils When getListeBoolean Then return dto for radio input', () => {
    const tested = ListUtils.getListeBoolean(jest.fn());
    expect(tested.length).toBe(2);
    expect(tested[0].id).toBe('true');
    expect(tested[1].id).toBe('false');
  });
});
