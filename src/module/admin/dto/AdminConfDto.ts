import { ITableDto } from '../../../mui/component/table/MdTableWithPagination';

export interface IFormDto {
  label: string;
  required: boolean;
  type: string;
  email?: boolean;
  disabled?: boolean;
}

export interface IAdminTabDto {
  name: string;
  findByChamps: string;
  sortBy: string;
  cells: ITableDto[];
  form: { [x: string]: IFormDto };
}

export interface IAdminTabConfDto {
  max: number;
  tabs: IAdminTabDto[];
}
