import { Namespace, TFunction } from 'i18next';

export type I18nTranslate = TFunction<Namespace, any>;

export const I18nUtils = {
  translate(t: I18nTranslate, libelle: string): string {
    return t(libelle) ?? '';
  },
};
