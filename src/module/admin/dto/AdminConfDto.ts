import { ITableProps } from '../../../mui/table/TableWithPagination';

export interface IFormDto {
  label: string;
  required: boolean;
  type: string;
}

export interface IAdminTabDto {
  name: string;
  findByChamps: string;
  rowsPerPage: number;
  sortBy: string;
  sortByOrder: 'asc' | 'desc';
  cells: ITableProps[];
  form: { [x: string]: IFormDto };
}

export interface IAdminTabConfDto {
  max: number;
  tabs: IAdminTabDto[];
}
