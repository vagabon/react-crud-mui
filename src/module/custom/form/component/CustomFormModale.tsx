import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiDto } from '../../../../dto/api/ApiDto';
import MdList from '../../../../mui/component/list/MdList';
import MdListItem from '../../../../mui/component/list/MdListItem';
import MdListItemButton from '../../../../mui/component/list/MdListItemButton';
import MdListItemText from '../../../../mui/component/list/MdListItemText';
import MdCommonModal from '../../../../mui/component/modal/MdCommonModal';
import MdSearchBar from '../../../../mui/component/searchbar/MdSearchBar';
import { IManyToManyDto } from '../../../admin/dto/AdminConfDto';
import AdminService from '../../../admin/service/AdminService';

interface ICustomFormModaleProps {
  conf?: IManyToManyDto;
  open: boolean;
  handleClose: () => void;
  handleSelect: (data: IApiDto) => () => void;
}

const CustomFormModale: React.FC<ICustomFormModaleProps> = ({ conf, open, ...rest }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const [datas, setDatas] = useState<IApiDto[]>([]);

  const loadDatas = useCallback(
    (search: string): void => {
      conf &&
        AdminService.findBy(conf.endPoint, conf.fields, search, 0, 500, conf.order, conf.orderBy).then((datas) => {
          setDatas(datas.content);
        });
    },
    [conf],
  );

  const handleSearch = useCallback((search: string): void => {
    setSearch(search);
  }, []);

  useEffect(() => {
    if (open === true) {
      loadDatas(search);
    }
  }, [open, search, loadDatas]);

  return (
    <MdCommonModal open={open} handleClose={rest.handleClose}>
      <MdSearchBar callBack={handleSearch} search={search} />
      <MdList className='modalList'>
        {(!datas || datas.length === 0) && (
          <MdListItem component='div' disablePadding>
            <MdListItemButton>
              <MdListItemText color='flex justify-center' label={t('NO_RESULT')} />
            </MdListItemButton>
          </MdListItem>
        )}
        {datas?.map((data) => (
          <MdListItem key={data.id} component='div' disablePadding>
            <MdListItemButton callback={rest.handleSelect(data)}>
              <MdListItemText label={(data['name' as keyof IApiDto] as string) ?? ''} />
            </MdListItemButton>
          </MdListItem>
        ))}
      </MdList>
    </MdCommonModal>
  );
};

export default CustomFormModale;
