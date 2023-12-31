import { useEffect, useState } from 'react';
import { ApiService } from '../../../../api/service/ApiService';
import { IApiDto } from '../../../../dto/api/ApiDto';
import { IPageableDto } from '../../../../dto/pageable/PageableDto';
import { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdFormSelect from '../../../../mui/component/form/select/MdFormSelect';
import { IListDto } from '../../../../utils/list/ListUtils';
import { IFormDto } from '../../../admin/dto/AdminConfDto';

export interface ICustomFormSelectProps extends IMdFormPropsReturnDto {
  conf: IFormDto;
  label: string;
  name: string;
  listId: boolean;
}

const CustomFormSelect: React.FC<ICustomFormSelectProps> = ({ conf, label, name, listId, ...rest }) => {
  const [datas, setDatas] = useState<IListDto[]>([]);

  useEffect(() => {
    conf.listEndPoint &&
      ApiService.get<IPageableDto<IApiDto[]>>(conf.listEndPoint).then((data) => {
        setDatas(
          data.content.map((dat) => {
            return {
              id: dat.id,
              libelle: dat[conf.listName as keyof IApiDto],
            } as IListDto;
          }),
        );
      });
  }, [conf]);

  return <MdFormSelect label={label} name={name} list={datas} byId={listId} {...rest} />;
};

export default CustomFormSelect;
