import { Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IMDFormPropsReturn } from './MDForm';
import { JSONObject } from 'dto/api/ApiDto';

export interface FormSwitchProps extends IMDFormPropsReturn {
  label: string;
  name: string;
}

const MDFormSwitch: React.FC<FormSwitchProps> = (props: FormSwitchProps) => {
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
    <div className='flex roles'>
      <Typography paragraph={true}>{props.label}</Typography>
      <Switch
        color='primary'
        checked={props.values[nameOnLoad as keyof JSONObject] === true || false}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
      />

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

export default MDFormSwitch;
