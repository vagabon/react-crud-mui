import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { JSONObject } from '../../../dto/api/ApiDto';
import { UuidUtils } from '../../../utils/uuid/UuidUtils';

export type TablePaginateCallbackType = (
  newPage: number,
  rowsPerPage: number,
  sortBy: string,
  sortByOrder: 'asc' | 'desc',
) => void;

export interface ITableDto {
  name: string;
  label: string;
  order?: boolean;
}

export interface IMdTableWithPaginationProps {
  url?: string;
  cells: ITableDto[];
  datas: JSONObject[];
  count: number;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortByOrder: 'asc' | 'desc';
  callBack: TablePaginateCallbackType;
}

const MdTableWithPagination: React.FC<IMdTableWithPaginationProps> = (props: IMdTableWithPaginationProps) => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<JSONObject[]>([]);

  useEffect(() => {
    const newDatas: JSONObject[] = [];
    for (let i = 0; i < props.rowsPerPage; i++) {
      if (props?.datas[i]) {
        newDatas.push(props.datas[i]);
      } else {
        newDatas.push({ empty: true, id: UuidUtils.createUUID() });
      }
    }
    setDatas(newDatas);
  }, [props.datas, props.rowsPerPage]);

  const handleChangePage = useCallback(
    (callBack: TablePaginateCallbackType) =>
      (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        event?.stopPropagation();
        callBack(newPage, props.rowsPerPage, props.sortBy, props.sortByOrder);
      },
    [props.rowsPerPage, props.sortBy, props.sortByOrder],
  );

  const handleChangeRowsPerPage = useCallback(
    (callBack: TablePaginateCallbackType) =>
      (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        callBack(props.page, parseInt(event.target.value), props.sortBy, props.sortByOrder);
      },
    [props.page, props.sortBy, props.sortByOrder],
  );

  const createSortHandle = useCallback(
    (property: string, callBack?: TablePaginateCallbackType) => (): void => {
      callBack?.(0, props.rowsPerPage, property, props.sortByOrder === 'asc' ? 'desc' : 'asc');
    },
    [props.rowsPerPage, props.sortByOrder],
  );

  const handleClick = useCallback(
    (id: string) => {
      props.url && navigate(props.url + id);
    },
    [navigate, props.url],
  );

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
    <div style={{ display: 'grid' }}>
      <h3>
        <Trans i18nKey='RESULTAT' /> : {props.count}
      </h3>
      <div style={{ overflow: 'auto' }}>
        <div>
          <Table size='small'>
            <TableHead>
              <TableRow>
                {props.cells?.map((cell: ITableDto) => (
                  <TableCell key={cell.name}>
                    <TableSortLabel
                      active={props.sortBy === cell.name}
                      direction={props.sortBy === cell.name ? props.sortByOrder : 'asc'}
                      onClick={createSortHandle(cell.name, cell.order ? props.callBack : undefined)}
                      hideSortIcon={!cell.order}>
                      <Trans i18nKey={cell.label} />
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!props?.datas || props.datas?.length === 0 ? (
                <TableRow>
                  <TableCell component='th' scope='row' colSpan={props.cells?.length}>
                    <Trans i18nKey='NOT_FOUND' />
                  </TableCell>
                </TableRow>
              ) : (
                datas.map((data: JSONObject) => (
                  <Fragment key={data['id' as keyof JSONObject]}>
                    {data && !data['empty' as keyof JSONObject] ? (
                      <TableRow onClick={() => handleClick(data['id' as keyof JSONObject])}>
                        {props.cells?.map((cell: ITableDto) => (
                          <TableCell component='th' scope='row' key={cell.name}>
                            {showData(data, cell.name)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ) : (
                      <TableRow key={data['id' as keyof JSONObject]}>
                        <TableCell component='th' scope='row' colSpan={props.cells?.length}>
                          &nbsp;
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10, 20, 50]}
                  count={props.count}
                  rowsPerPage={props.rowsPerPage}
                  page={props.page}
                  onPageChange={handleChangePage(props.callBack)}
                  onRowsPerPageChange={handleChangeRowsPerPage(props.callBack)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MdTableWithPagination;
