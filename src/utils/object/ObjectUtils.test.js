import { ObjectUtils } from './ObjectUtils';

describe('ObjectUtils', () => {
  test('Given ObjectUtils When getDtoValue Then return value', () => {
    const data = { name: 'value' };
    const tested = ObjectUtils.getDtoValue(data, 'name');
    expect(tested).toBe('value');
  });

  test('Given ObjectUtils When getDtoString Then return value', () => {
    const data = { name: 'value' };
    const tested = ObjectUtils.getDtoString(data, 'name');
    expect(tested).toBe('value');
  });
});
