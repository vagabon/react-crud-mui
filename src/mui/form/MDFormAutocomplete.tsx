import { Autocomplete, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IMDFormPropsReturn } from './MDForm';
import { JSONObject } from 'dto/api/ApiDto';
import { ListType } from 'utils/list/ListUtils';

export interface FormAutocompleteProps extends IMDFormPropsReturn {
  label: string;
  name: string;
  list: ListType[];
}

const MDFormAutocomplete: React.FC<FormAutocompleteProps> = (props: FormAutocompleteProps) => {
  const [error, setError] = useState<string>('');

  const [nameOnLoad] = useState(props.name);

  useEffect(() => {
    const error = props.errors[nameOnLoad as keyof JSONObject];
    if (error !== undefined && error !== '' && props.touched[nameOnLoad as keyof JSONObject]) {
      setError(error);
    } else {
      setError('');
    }
  }, [props.errors, props.touched, nameOnLoad]);

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: '8px', marginTop: '16px' }}>
        <Autocomplete
          id={props.name}
          value={props.values[nameOnLoad as keyof JSONObject] || ''}
          options={props.list}
          sx={{ width: '100%' }}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          renderInput={(params) => <TextField {...params} label={props.label} />}
        />
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

MDFormAutocomplete.defaultProps = {};

export default MDFormAutocomplete;
