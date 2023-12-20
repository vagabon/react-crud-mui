import { ITableProps } from '../../../mui/component/table/MDTableWithPagination';

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
  cells: ITableProps[];
  form: { [x: string]: IFormDto };
}

export interface IAdminTabConfDto {
  max: number;
  tabs: IAdminTabDto[];
}
