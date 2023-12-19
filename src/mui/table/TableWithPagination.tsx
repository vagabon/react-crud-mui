import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JSONObject } from '../../dto/api/ApiDto';

export interface ITableProps {
  name: string;
  label: string;
  order?: boolean;
}

export interface TableWithPagniationProps {
  url?: string;
  cells: ITableProps[];
  datas: JSONObject[];
  count: number;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortByOrder: 'asc' | 'desc';
  callBack: (newPage: number, rowsPerPage: number, sortBy: string, sortByOrder: 'asc' | 'desc') => void;
}

const TableWithPagination: React.FC<TableWithPagniationProps> = (props: TableWithPagniationProps) => {
  const navigate = useNavigate();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    props.callBack(newPage, props.rowsPerPage, props.sortBy, props.sortByOrder);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    props.callBack(props.page, parseInt(event.target.value), props.sortBy, props.sortByOrder);
  };

  const createSortHandle = (property: string) => (): void => {
    props.callBack(0, props.rowsPerPage, property, props.sortByOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleClick = (id: string) => {
    props.url && navigate(props.url + id);
  };

  const showData = (data: JSONObject, name: string): string => {
    let value: JSONObject | string = data;
    const splits = name.split('.');
    value = value[splits[0] as keyof JSONObject] ?? '';
    if (Array.isArray(value) && splits[1] !== undefined) {
      value = (value as Array<JSONObject>)
        .map((val: JSONObject) => {
          return val[splits[1] as keyof JSONObject];
        })
        .join(', ');
    } else if (splits[1] !== undefined) {
      value = value[splits[1] as keyof JSONObject];
    }
    return '' + value;
  };

  return (
    <div style={{ flex: '1', width: '100%' }}>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {props.cells?.map((cell: ITableProps) => (
                <TableCell key={cell.name}>
                  <TableSortLabel
                    active={props.sortBy === cell.name}
                    direction={props.sortBy === cell.name ? props.sortByOrder : 'asc'}
                    onClick={cell.order ? createSortHandle(cell.name) : () => {}}
                    hideSortIcon={!cell.order}>
                    {cell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.datas.map(
              (data: JSONObject) =>
                data && (
                  <TableRow
                    key={data['id' as keyof JSONObject]}
                    onClick={() => handleClick(data['id' as keyof JSONObject])}>
                    {props.cells?.map((cell: ITableProps) => (
                      <TableCell component='th' scope='row' key={cell.name}>
                        {showData(data, cell.name)}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 10, 20, 50]}
                count={props.count}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableWithPagination;
