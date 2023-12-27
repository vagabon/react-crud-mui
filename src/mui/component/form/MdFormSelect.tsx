import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { IApiDto, JSONObject } from '../../../dto/api/ApiDto';
import { useFormError } from '../../hook/useFormError';
import { IMdFormPropsReturnDto } from './MdForm';

interface IList {
  value: string | number;
  name: string;
}

export interface IMdFormSelectProps extends IMdFormPropsReturnDto {
  label: string;
  name: string;
  list: IApiDto[];
  callBack?: (value: string) => void;
  disabled?: boolean;
  byId?: boolean;
}

const MdFormSelect: React.FC<IMdFormSelectProps> = (props: IMdFormSelectProps) => {
  const { showError } = useFormError(props.name, props.errors, props.touched);

  const [value, setValue] = useState<string>('');
  const [values, setValues] = useState<IList[]>([]);

  useEffect(() => {
    const values: IList[] = [];
    props.list.forEach((value) => {
      if (value.id) {
        values.push({ value: value.id, name: value['name' as keyof JSONObject] });
      }
    });
    setValues(values);
  }, [props.list]);

  const propsValues = props.values[props.name as keyof JSONObject];
  const validationSchema = props.validationSchema[props.name as keyof JSONObject] ?? {};

  useEffect(() => {
    setValue(props.byId === true ? propsValues?.['id'] ?? '' : propsValues ?? '');
  }, [propsValues, props.byId]);

  const doChange = useCallback(
    (event: SelectChangeEvent<string | JSONObject>) => {
      event.preventDefault();
      const value: string | JSONObject = event.target.value;
      event.target.value = props.byId === true ? { id: value } : value;
      props.handleChange(event);
      props.callBack?.((value as string).toString());
    },
    [props],
  );

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: '8px', marginTop: '16px' }} disabled={props.disabled}>
        <InputLabel id={props.name + '-label'}>
          {props.label}
          {validationSchema['required'] ? '*' : ''}
        </InputLabel>
        {values && values.length > 0 && (
          <Select
            labelId={props.name + '-label'}
            id={props.name}
            name={props.name}
            value={value ?? ''}
            required={validationSchema['required']}
            label={props.label}
            onChange={doChange}
            sx={{ width: '95%' }}>
            <MenuItem key='' value=''></MenuItem>
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
