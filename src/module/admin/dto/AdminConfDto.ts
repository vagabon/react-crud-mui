export interface IAdminCellDto {
  name: string;
  label: string;
  order?: boolean;
}

export interface IAdminReducerDto {
  datas: JSON[];
  data: JSON;
  search: string;
  page: number;
  count: number;
}

export interface AdminStateProps {
  name: string;
  findByChamps: string;
  rowsPerPage: number;
  sortBy: string;
  sortByOrder: 'asc' | 'desc';
  cells: IAdminCellDto[];
}

export interface IAdminConfDto {
  max: number;
  tabs: AdminStateProps[];
}

const max: number = 10;
const order: 'asc' | 'desc' = 'asc';

const defaultState = {
  datas: [],
  data: {},
  search: '',
  page: 0,
  count: 0,
  max: max,
  order: order,
  refresh: true,
};
