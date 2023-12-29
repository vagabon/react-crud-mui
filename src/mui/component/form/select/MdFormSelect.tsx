import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiDto, JSONObject } from '../../../../dto/api/ApiDto';
import { useFormError } from '../../../hook/useFormError';
import { IMdFormPropsReturnDto } from '../MdForm';

interface IList {
  value: string | number;
  name: string;
}

export interface IMdFormSelectProps extends IMdFormPropsReturnDto {
  label: string;
  name: string;
  list: IApiDto[];
  callBack?: (value?: string | JSONObject) => void;
  disabled?: boolean;
  byId?: boolean;
}

const MdFormSelect: React.FC<IMdFormSelectProps> = (props: IMdFormSelectProps) => {
  const { t } = useTranslation();
  const { error, showError } = useFormError(props.name, props.errors, props.touched);

  const [value, setValue] = useState<string>('');
  const [values, setValues] = useState<IList[]>([]);

  useEffect(() => {
    const values: IList[] = [];
    props.list.forEach((value) => {
      value.id && values.push({ value: value.id, name: value['libelle' as keyof JSONObject] });
    });
    setValues(values);
  }, [props.list]);

  const propsValues = props.values[props.name as keyof JSONObject];
  const validationSchema = props.validationSchema[props.name as keyof JSONObject] ?? {};

  useEffect(() => {
    setValue(props.byId === true ? propsValues?.['id'] ?? '' : propsValues ?? '');
  }, [propsValues, props.byId]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | JSONObject | undefined>) => {
      event.preventDefault();
      let value: string | JSONObject | undefined = event.target.value;
      if (value === '') {
        value = undefined;
      } else {
        value = props.byId === true ? { id: value } : value;
      }
      event.target.value = value;
      props.handleChange(event);
      props.callBack?.(value);
    },
    [props],
  );

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: '8px', marginTop: '16px' }} disabled={props.disabled}>
        <InputLabel id={props.name + '-label'} error={error !== ''}>
          {t(props.label)}
          {validationSchema['required'] ? ' *' : ''}
        </InputLabel>
        {values && values.length > 0 && (
          <Select
            error={error !== ''}
            labelId={props.name + '-label'}
            id={props.name}
            name={props.name}
            value={value ?? ''}
            required={validationSchema['required']}
            label={props.label}
            onChange={handleChange}
            className='width100'>
            <MenuItem value=''>Aucun</MenuItem>
            {values &&
              values.length > 0 &&
              values.map((myValue) => (
                <MenuItem key={myValue.name + myValue.value} value={myValue.value}>
                  {myValue.name}
                </MenuItem>
              ))}
          </Select>
        )}
      </FormControl>

      {showError()}
    </div>
  );
};

MdFormSelect.defaultProps = {};

export default MdFormSelect;
