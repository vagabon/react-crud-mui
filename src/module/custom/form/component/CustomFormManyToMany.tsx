import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { IApiDto, ID, JSONObject } from '../../../../dto/api/ApiDto';
import MdButton from '../../../../mui/component/button/MdButton';
import MdChip from '../../../../mui/component/chip/MdChip';
import { IMdFormPropsReturnDto, SetFieldValueType } from '../../../../mui/component/form/MdForm';
import MdTypo from '../../../../mui/component/typo/MdTypo';
import { useFormError } from '../../../../mui/hook/useFormError';
import { IFormDto } from '../../../admin/dto/AdminConfDto';
import CustomFormModale from './CustomFormModale';

export interface ICustomFormManyToManyProps extends IMdFormPropsReturnDto {
  conf: IFormDto;
  label: string;
  name: string;
}

const CustomFormManyToMany: React.FC<ICustomFormManyToManyProps> = ({ conf, label, name, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState<IApiDto[]>();
  const { showError } = useFormError(name, rest.errors, rest.touched);

  const validationSchema = rest.validationSchema?.[name as keyof JSONObject] ?? {};

  useEffect(() => {
    setDatas(rest.values[name as keyof JSONObject] as IApiDto[]);
  }, [rest.values, name]);

  const handleSelectData = useCallback(
    (oldDatas?: IApiDto[], callback?: SetFieldValueType) => (data: IApiDto) => () => {
      const newDatas = [...(oldDatas ?? [])];
      if (!newDatas.find((oneData) => oneData.id === data.id)) {
        newDatas.push(data);
      }
      setDatas(newDatas);
      callback?.(name, newDatas);
      setOpen(false);
    },
    [name],
  );

  const handleDelete = useCallback(
    (id: ID, oldDatas: IApiDto[], callback: SetFieldValueType) => () => {
      if (id && oldDatas) {
        const newDatas = oldDatas.filter((oneData: IApiDto) => oneData.id !== id);
        setDatas(newDatas);
        callback(name, newDatas);
      }
    },
    [name],
  );

  const handleModalOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const handleModalClose = useCallback((): void => {
    setOpen(false);
  }, []);

  return (
    <>
      <div className='flex m2m width100'>
        <div>
          <MdTypo paragraph={true} sx={{ marginLeft: '10px' }}>
            <Trans i18nKey={label} />
            {validationSchema['required'] ? ' *' : ''}
          </MdTypo>
          <div>
            {datas?.map((data: IApiDto) => (
              <MdChip
                key={data.id}
                label={(data?.[conf.m2m?.name as keyof IApiDto] as string) ?? ''}
                callbackDelete={handleDelete(data.id, datas, rest.setFieldValue)}
              />
            ))}
            <MdButton onClick={handleModalOpen} icon='add' />
          </div>
        </div>
        {showError()}
      </div>
      <CustomFormModale
        conf={conf.m2m}
        open={open}
        handleClose={handleModalClose}
        handleSelect={handleSelectData(datas, rest.setFieldValue)}
      />
    </>
  );
};

export default CustomFormManyToMany;
