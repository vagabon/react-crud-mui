import { IApiDto, JSONObject } from '../../dto/api/ApiDto';

export const ObjectUtils = {
  capitalize(name?: string) {
    return name && name?.length > 1 ? name[0].toUpperCase() + name.slice(1) : name?.[0].toUpperCase() ?? '';
  },
  getDtoValue: (data: IApiDto | JSONObject, name: string) => {
    return data[name as keyof (IApiDto | JSONObject)];
  },
  getDtoString: (data: IApiDto | JSONObject, name: string) => {
    return ObjectUtils.getDtoValue(data, name) as string;
  },
};
