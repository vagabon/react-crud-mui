import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiDto } from '../../../../dto/api/ApiDto';
import MdListItemText from '../../../../mui/component/list/MdListItemText';
import Mdlist from '../../../../mui/component/list/Mdlist';
import MdlistItem from '../../../../mui/component/list/MdlistItem';
import MdlistItemButton from '../../../../mui/component/list/MdlistItemButton';
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
      <Mdlist className='modalList'>
        {(!datas || datas.length === 0) && (
          <MdlistItem component='div' disablePadding>
            <MdlistItemButton>
              <MdListItemText color='flex justify-center' label={t('NO_RESULT')} />
            </MdlistItemButton>
          </MdlistItem>
        )}
        {datas?.map((data) => (
          <MdlistItem key={data.id} component='div' disablePadding>
            <MdlistItemButton callback={rest.handleSelect(data)}>
              <MdListItemText label={(data['name' as keyof IApiDto] as string) ?? ''} />
            </MdlistItemButton>
          </MdlistItem>
        ))}
      </Mdlist>
    </MdCommonModal>
  );
};

export default CustomFormModale;
