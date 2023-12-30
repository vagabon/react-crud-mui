export type ID = string | number | undefined | null;
export type Primitif = string | number | boolean | undefined | null;
export type JSONValue = Primitif | { [x: string]: JSONValue } | Array<JSONValue> | IApiDto;
export type JSONObject = { [x: string]: JSONValue } | Array<JSONObject> | IApiDto;
export type JSON = { [x: string]: JSON | Primitif };

export interface IApiDto {
  id?: ID;
  creationDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  active?: boolean;
}

// TODO : remove it on objectUtils
export const getApiDtoValue = (data: IApiDto, name: string) => {
  return data[name as keyof IApiDto];
};
