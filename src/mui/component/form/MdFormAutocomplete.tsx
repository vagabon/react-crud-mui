import { Autocomplete, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { JSONObject } from '../../../dto/api/ApiDto';
import { ListType } from '../../../utils/list/ListUtils';
import { IMdFormPropsReturnDto } from './MdForm';

export interface IMdFormAutocompleteProps extends IMdFormPropsReturnDto {
  label: string;
  name: string;
  list: ListType[];
}

const MdFormAutocomplete: React.FC<IMdFormAutocompleteProps> = (props: IMdFormAutocompleteProps) => {
  const [error, setError] = useState<string>('');

  const nameOnLoad = props.name;

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

MdFormAutocomplete.defaultProps = {};

export default MdFormAutocomplete;
