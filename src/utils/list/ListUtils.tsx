import { IApiDto, JSONObject } from '../../dto/api/ApiDto';
import { I18nUtils, I18nTranslate } from '../i18n/I18nUtils';

export interface IList extends IApiDto {
  libelle: string;
}

export type ListType = { id: string | number; name: string };

export const ListUtils = {
  convertEnumToList: <T,>(enums: T, libelle: string, t: I18nTranslate): IList[] => {
    const list: IList[] = [];
    for (let item in enums) {
      if (isNaN(Number(item))) {
        list.push({
          id: item,
          libelle: I18nUtils.translate(t, libelle + item),
        });
      }
    }
    return list;
  },
  getListeBoolean: (t: I18nTranslate): IList[] => {
    const list: IList[] = [];
    list.push({ id: 'true', libelle: I18nUtils.translate(t, 'OUI') });
    list.push({ id: 'false', libelle: I18nUtils.translate(t, 'NON') });
    return list;
  },
  toSelectData(datas: JSONObject[]): ListType[] {
    return datas.map((data: JSONObject) => ({
      name: data['name' as keyof JSONObject] || '',
      id: data['id' as keyof JSONObject] || '0',
    }));
  },
};
