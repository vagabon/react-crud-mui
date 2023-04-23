import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { IMDFormPropsReturn } from './MDForm';
import { IApiDto, JSONObject } from 'dto/api/ApiDto';

interface IList {
  value: string | number;
  name: string;
}

export interface IMdFormSelectProps extends IMDFormPropsReturn {
  label: string;
  name: string;
  list: IApiDto[];
  callBack?: (value: string) => void;
  disabled?: boolean;
  byId?: boolean;
}

const MdFormSelect: React.FC<IMdFormSelectProps> = (props: IMdFormSelectProps) => {
  const [error, setError] = useState<string>('');

  const [value, setValue] = useState<string>('');
  const [values, setValues] = useState<IList[]>([]);

  const [nameOnLoad] = useState(props.name);

  useEffect(() => {
    const values: IList[] = [];
    props.list.forEach((value) => {
      if (value.id) {
        values.push({ value: value.id, name: value['name' as keyof JSONObject] });
      }
    });
    setValues(values);
  }, [props.list]);

  const propsValues = props.values[nameOnLoad as keyof JSONObject];
  const validationSchema = props.validationSchema[nameOnLoad as keyof JSONObject];

  useEffect(() => {
    setValue(props.byId === true ? propsValues?.['id'] ?? '' : propsValues ?? '');
  }, [propsValues, props.byId]);

  useEffect(() => {
    const propsError = props.errors[nameOnLoad as keyof JSONObject];
    const error = props.byId === true && propsError ? propsError['id'] : propsError;
    if (error !== undefined && error !== '') {
      setError(error);
    } else {
      setError('');
    }
  }, [props.errors, props.byId, props.touched, nameOnLoad]);

  const doChange = (event: SelectChangeEvent<string | JSONObject>) => {
    event.preventDefault();
    const value: string | JSONObject = event.target.value;
    event.target.value = props.byId === true ? { id: value } : value;
    props.handleChange && props.handleChange(event);
    props.callBack && props.callBack(value.toString());
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: '8px', marginTop: '16px' }} disabled={props.disabled}>
        <InputLabel id={props.name + '-label'}>
          {props.label || props.label}
          {validationSchema && validationSchema['required'] ? '*' : ''}
        </InputLabel>
        {values && values.length > 0 && (
          <Select
            labelId={props.name + '-label'}
            id={props.name}
            name={props.name}
            value={value || ''}
            required={validationSchema && validationSchema['required']}
            label={props.label || props.label}
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

      {error && (
        <div className='form-group'>
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

MdFormSelect.defaultProps = {};

export default MdFormSelect;
