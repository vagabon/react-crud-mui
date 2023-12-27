import { Autocomplete, FormControl, TextField } from '@mui/material';
import { JSONObject } from '../../../dto/api/ApiDto';
import { ListType } from '../../../utils/list/ListUtils';
import { useFormError } from '../../hook/useFormError';
import { IMdFormPropsReturnDto } from './MdForm';

export interface IMdFormAutocompleteProps extends IMdFormPropsReturnDto {
  label: string;
  name: string;
  list: ListType[];
}

const MdFormAutocomplete: React.FC<IMdFormAutocompleteProps> = (props: IMdFormAutocompleteProps) => {
  const { showError } = useFormError(props.name, props.errors, props.touched);

  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth sx={{ marginBottom: '8px', marginTop: '16px' }}>
        <Autocomplete
          id={props.name}
          value={props.values[props.name as keyof JSONObject] || ''}
          options={props.list}
          sx={{ width: '100%' }}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          renderInput={(params) => <TextField {...params} label={props.label} />}
        />
      </FormControl>

      {showError()}
    </div>
  );
};

MdFormAutocomplete.defaultProps = {};

export default MdFormAutocomplete;
