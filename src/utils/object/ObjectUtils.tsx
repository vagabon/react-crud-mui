import { IApiDto } from '../../dto/api/ApiDto';

export const ObjectUtils = {
  capitalize(name?: string) {
    return name && name?.length > 1 ? name[0].toUpperCase() + name.slice(1) : name?.[0].toUpperCase() ?? '';
  },
  getDtoValue: (data: IApiDto, name: string) => {
    return data[name as keyof IApiDto];
  },
  getDtoString: (data: IApiDto, name: string) => {
    return ObjectUtils.getDtoValue(data, name) as string;
  },
};
