import { IApiDto, JSONObject } from '../../dto/api/ApiDto';
import { I18nTranslate, I18nUtils } from '../i18n/I18nUtils';

export interface IListDto extends IApiDto {
  libelle: string;
}

export type ListType = { id: string | number; name: string };

export const ListUtils = {
  convertEnumToList: <T>(enums: T, libelle: string, t: I18nTranslate): IListDto[] => {
    const list: IListDto[] = [];
    for (const item in enums) {
      if (isNaN(Number(item))) {
        list.push({
          id: item,
          libelle: I18nUtils.translate(t, libelle + item),
        });
      }
    }
    return list;
  },
  getListeBoolean: (t: I18nTranslate): IListDto[] => {
    const list: IListDto[] = [];
    list.push({ id: 'true', libelle: I18nUtils.translate(t, 'OUI') });
    list.push({ id: 'false', libelle: I18nUtils.translate(t, 'NON') });
    return list;
  },
  // @Deprecated
  toSelectData(datas: JSONObject[]): ListType[] {
    return datas.map((data: JSONObject) => ({
      name: data['name' as keyof JSONObject] || '',
      id: data['id' as keyof JSONObject] || '0',
    }));
  },
};
