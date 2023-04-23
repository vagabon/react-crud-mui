import { I18nUtils } from './I18nUtils';

describe('I18Utils - translate', () => {
  test('Given I18Utils When libelle is find Then show libelle', () => {
    const t = jest.fn().mockImplementation((text) => text);
    const tested = I18nUtils.translate(t, 'libelle');
    expect(tested).toBe('libelle');
  });

  test('Given I18Utils When libelle is null Then show empty string', () => {
    const t = jest.fn().mockImplementation(() => null);
    const tested = I18nUtils.translate(t, 'libelle');
    expect(tested).toBe('');
  });
});
